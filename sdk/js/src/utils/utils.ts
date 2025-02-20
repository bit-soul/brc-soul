let fetch = typeof window !== 'undefined' && window.fetch ? window.fetch : null;
let bip322 = null;
let proxyagent = null;
const fetch_pack_name = 'node-fetch';
const bip322_pack_name = 'bip322-js';
const proxyagent_pack_name = 'socks-proxy-agent';
const require_to_avoid_pack = require;
if (typeof window === 'undefined') {
  fetch = require_to_avoid_pack(fetch_pack_name);
  bip322 = require_to_avoid_pack(bip322_pack_name);
  proxyagent = require_to_avoid_pack(proxyagent_pack_name);
}

const sdkglb = require('../global');

/*********************************************************
 * config sdk api
 *********************************************************/
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

/*********************************************************
 * some lodash utils
 *********************************************************/
export function isNull(obj) {
  return Object.prototype.toString.call(obj) === '[object Null]';
}
export function isNumber(obj) {
  return Object.prototype.toString.call(obj) === '[object Number]';
}
export function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
}
export function isBoolean(obj) {
  return Object.prototype.toString.call(obj) === '[object Boolean]';
}
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
export function isFunction(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
}
export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

export function isEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (!obj2.hasOwnProperty(key)) return false;
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        if (!isEqual(obj1[key], obj2[key])) return false;
      } else if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }

  return true;
}

/*********************************************************
 * bitcoin lib utils
 *********************************************************/
export function signMessage(privateKey, address, message) {
  if (!bip322) {
    return '';
  }
  try {
    return bip322.Signer.sign(privateKey, address, message);
  } catch (e) {
    return '';
  }
}

export function verifySign(address: string, message: string, signature: string) {
  if (!bip322) {
    return false;
  }
  try {
    return bip322.Verifier.verifySignature(address, message, signature);
  } catch (e) {
    return false;
  }
}

/*********************************************************
 * brcsoul protocol utils
 *********************************************************/
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

export function merge_attr(des_attr, new_attr) {
  let res_attr = null;

  if (isObject(new_attr)) {
    if (isObject(des_attr)) {
      res_attr = Object.assign(des_attr, new_attr); //modify attr
    } else {
      res_attr = new_attr; //assign to attr directly
    }
  } else {
    if (isObject(des_attr)) {
      if (new_attr === null) {
        res_attr = null; //delete all attr
      } else {
        //data.attr may be undefined or invalid, allow use it to update the timestamp
        res_attr = des_attr;
      }
    } else {
      res_attr = null;
    }
  }

  return res_attr;
}

export function normalizeMess(obj: object) {
  if (typeof obj === 'string') {
    return `"${obj}"`;
  }
  if (obj === null || typeof obj !== 'object') {
    return String(obj);
  }

  if (Array.isArray(obj)) {
    const arrStr = obj.map((item) => normalizeMess(item)).join(',');
    return `[${arrStr}]`;
  }

  const objStr = Object.keys(obj)
    .sort()
    .map((key) => {
      if (obj[key] === undefined || typeof obj[key] === 'function') {
        return '';
      }
      return `"${key}":${normalizeMess(obj[key])}`;
    })
    .filter((item) => item !== '')
    .join(',');
  return `{${objStr}}`;
}

export function signOPDate(data: object, addr: string, privateKey: string) {
  if (!bip322) {
    return null;
  }
  if (data && data['sign']) {
    return null;
  }
  try {
    const temp = deepCopy(data);
    const mess = normalizeMess(temp);
    const sign = bip322.Signer.sign(privateKey, addr, mess);

    temp['sign'] = sign;
    return temp;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function checkOPSign(data: object, addr: string) {
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
    const mess = normalizeMess(temp);

    return bip322.Verifier.verifySignature(addr, mess, sign);
  } catch (e) {
    return false;
  }
}

export function parseData(data_str) {
  try {
    const json = JSON.parse(data_str);
    if (!json['p'] || json['p'] !== 'brc-soul') {
      return null;
    } else {
      return json;
    }
  } catch (e) {
    return null;
  }
}

export function concateCoid(mydid: number, coid_seq: number, is_group: boolean) {
  if (is_group) {
    return (mydid << 24) | (0x01 << 16) | (coid_seq & 0xffff);
  } else {
    return (mydid << 24) | (0x00 << 16) | (coid_seq & 0xffff);
  }
}

export function validateVcsItem(vcs_item: (number | number[])[], cur_time: number = Math.round(Date.now() / 1000)) {
  if (!isArray(vcs_item)) {
    return 'vcs_item must be array: ' + JSON.stringify(vcs_item);
  }
  if (!isNumber(cur_time)) {
    return 'cur_time must be number: ' + JSON.stringify(vcs_item);
  }

  const type = vcs_item[0];
  const coid = vcs_item[1];

  if (!isNumber(type) || !isNumber(coid)) {
    return 'type and coid must be number: ' + JSON.stringify(vcs_item);
  }

  switch (type) {
    case 1: //delete_sbt_by_coid
      if (vcs_item.length !== 2) {
        return 'TYPE_COID vcs_item array length must be 2: ' + JSON.stringify(vcs_item);
      }
      break;
    case 2: //delete_sbt_by_vcid
      if (vcs_item.length !== 3) {
        return 'TYPE_VCID vcs_item array length must be 3: ' + JSON.stringify(vcs_item);
      }
      if (!isArray(vcs_item[2])) {
        return 'vcids must be number array: ' + JSON.stringify(vcs_item);
      }
      //@ts-ignore
      for (const vcid of vcs_item[2]) {
        if (!isNumber(vcid)) {
          return 'vcids must be number array: ' + JSON.stringify(vcs_item);
        }
      }
      break;
    case 3: //delete_sbt_by_flag
      if (vcs_item.length !== 3) {
        return 'TYPE_FLAG vcs_item array length must be 3: ' + JSON.stringify(vcs_item);
      }
      if (!isNumber(vcs_item[2])) {
        return 'flag must be number: ' + JSON.stringify(vcs_item);
      }
      break;
    case 4: //delete_sbt_by_time
      if (vcs_item.length !== 4) {
        return 'TYPE_TIME vcs_item array length must be 4: ' + JSON.stringify(vcs_item);
      }
      if (!isNumber(vcs_item[2]) || !isNumber(vcs_item[3])) {
        return 'time must be number: ' + JSON.stringify(vcs_item);
      }
      if (!(vcs_item[2] >= 0 && vcs_item[3] >= 0 && vcs_item[2] <= vcs_item[3] && vcs_item[3] <= cur_time + 7200)) {
        return 'time not in valid range(0<=time_start<=time_end<=current+7200): ' + JSON.stringify(vcs_item);
      }
      break;
    case 5: //delete_sbt_by_flag_and_time
      if (vcs_item.length !== 5) {
        return 'TYPE_FLAG_AND_TIME vcs_item array length must be 5: ' + JSON.stringify(vcs_item);
      }
      if (!isNumber(vcs_item[2]) || !isNumber(vcs_item[3]) || !isNumber(vcs_item[4])) {
        return 'flag and time must be number: ' + JSON.stringify(vcs_item);
      }
      if (!(vcs_item[3] >= 0 && vcs_item[4] >= 0 && vcs_item[3] <= vcs_item[4] && vcs_item[4] <= cur_time + 7200)) {
        return 'time not in valid range(0<=time_start<=time_end<=current+7200): ' + JSON.stringify(vcs_item);
      }
      break;
    default:
      return 'vcs_item type not valid: ' + JSON.stringify(vcs_item);
  }

  return null;
}

/*********************************************************
 * network utils
 *********************************************************/
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
