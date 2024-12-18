import { fetchData } from '../utils/utils';

const sdkglb = require('../global');

export async function getPersonByDid(did: number) {
  const result = {};

  if (!did) {
    result['code'] = -1;
    result['mess'] = 'did not valid';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/personbydid?did=${did}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getPersonByAddr(addr: string) {
  const result = {};

  if (!addr) {
    result['code'] = -1;
    result['mess'] = 'addr not valid';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/personbyaddr?addr=${addr}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getDid(did: number, mydid: number = 0) {
  const result = {};

  if (!did) {
    result['code'] = -1;
    result['mess'] = 'did not valid';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/did/${did}?mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getDids(mydid: number = 0, size: number = 10, page: number = 0) {
  const result = {};

  if (size > 100) {
    result['code'] = -1;
    result['mess'] = 'page size must small than 100';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/dids?mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getBatchDids(dids: number[], mydid: number = 0) {
  const result = {};

  if (dids.length <= 0 || dids.length > 100) {
    result['code'] = -1;
    result['mess'] = 'dids size must small than 100';
    return result;
  }

  const unq = [...new Set(dids)];
  const url = sdkglb.config.brc_soul_api + `/api/batchdids?dids=[${unq}]&mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}
