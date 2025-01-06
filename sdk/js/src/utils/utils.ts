let fetch = window && window.fetch ? window.fetch : null;
let bip322 = null;
let proxyagent = null;
const fetch_pack_name = 'node-fetch';
const bip322_pack_name = 'bip322-js';
const proxyagent_pack_name = 'socks-proxy-agent';
const require_to_avoid_pack = require;
if (typeof window !== 'undefined') {
  fetch = require_to_avoid_pack(fetch_pack_name);
  bip322 = require_to_avoid_pack(bip322_pack_name);
  proxyagent = require_to_avoid_pack(proxyagent_pack_name);
}

const sdkglb = require('../global');

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

export function sortObject(obj: Object) {
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

export function concateCoid(mydid: number, coid_seq: number, is_group: boolean) {
  if (is_group) {
    return (mydid << 24) | (0x01 << 16) | (coid_seq & 0xffff);
  } else {
    return (mydid << 24) | (0x00 << 16) | (coid_seq & 0xffff);
  }
}

export function normalizeMess(obj: Object) {
  return JSON.stringify(sortObject(obj));
}

export function checkSign(data: Object, addr: string) {
  if (!bip322) {
    return false;
  }

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

export async function fetchWithTimeout(url: string, options: any = {}, timeout: number = 15000) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out: ' + url));
    }, timeout);
  });

  return Promise.race([fetch(url, options), timeoutPromise]);
}

export async function fetchData(url, method = 'GET', body: any = null) {
  try {
    const options: any = {
      agent: sdkglb.agent,
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (method.toUpperCase() === 'POST' && body) {
      options.body = JSON.stringify(body);
    }

    const response: any = await fetchWithTimeout(url, options);
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

export function updateGlobalBrcSoulApi(api_base_url: string) {
  sdkglb.config.brc_soul_api = api_base_url.replace(/\/$/, '');
}

//[ 'socks', 'socks4', 'socks4a', 'socks5', 'socks5h' ]
export function setGlobalProxyAgent(socks_proxy_url: string) {
  if (!proxyagent) {
    sdkglb.agent = null;
    return;
  }

  try {
    sdkglb.agent = new proxyagent.SocksProxyAgent(socks_proxy_url);
  } catch (e) {
    sdkglb.agent = null;
  }
}
