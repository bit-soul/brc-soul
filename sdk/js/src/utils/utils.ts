import fetch from 'node-fetch';
import * as bip322 from 'bip322-js';

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retryTimes(fun: Function, times: number, interval: number) {
  let last_error;

  for (let retry_cnt = 0; retry_cnt < times; ++retry_cnt) {
    try {
      return await fun();
    } catch (error) {
      await sleep(interval);
      last_error = error;
    }
  }

  throw last_error;
}

export function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // give temp the original obj's constructor
  const temp = obj.constructor();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      temp[key] = deepCopy(obj[key]);
    }
  }

  return temp;
}

export function sortObject(obj) {
  //Recursively sort each value in the dictionary and sort by keys
  if (Array.isArray(obj)) {
    return obj.map(sortObject);
  }

  //Recursively sort each element in the list, but keep the original order
  if (obj !== null && typeof obj === 'object') {
    const sortedObj = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sortedObj[key] = sortObject(obj[key]);
      });
    return sortedObj;
  }

  //Return non-list and non-dictionary data as is
  return obj;
}

export function checkSign(data, addr) {
  if (!data || !data['sign']) {
    return false;
  }

  try {
    const temp = deepCopy(data);
    const sign = temp['sign'];
    delete temp['sign'];
    const mess = JSON.stringify(sortObject(temp));

    return bip322.Verifier.verifySignature(addr, mess, sign);
  } catch (e) {
    return false;
  }
}

export async function fetchWithTimeout(
  url: string,
  options: fetch.RequestInit = {},
  timeout: number = 15000,
): Promise<fetch.Response> {
  const timeoutPromise = new Promise<fetch.Response>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out: ' + url));
    }, timeout);
  });

  return Promise.race([fetch(url, options), timeoutPromise]);
}

export async function fetchData(url, method = 'GET', body: any = null) {
  try {
    const options: any = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (method.toUpperCase() === 'POST' && body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetchWithTimeout(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json: any = await response.json();
    if (!json || (typeof json.code).toLowerCase() !== 'number') {
      throw new Error('API error! invalid json.code');
    }
    return json;
  } catch (err) {
    console.log(err);
    return {
      code: -999,
      mess: err.toString(),
    };
  }
}

export function updateGlobalBrcSoulApi(base_url) {
  global.config.brc_soul_api = base_url.replace(/\/$/, '');
}
