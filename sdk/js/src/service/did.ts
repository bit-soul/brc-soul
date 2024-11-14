import { fetchData } from '../utils/utils';

async function getPersonByDid(did: number) {
  const result = {};

  if (!did) {
    result['code'] = -1;
    result['mess'] = 'did not valid';
    return result;
  }

  const url = global.config.brc_soul_api + `/api/personbydid?did=${did}`;
  const json: any = await fetchData(url);
  return json;
}

async function getPersonByAddr(addr: string) {
  const result = {};

  if (!addr) {
    result['code'] = -1;
    result['mess'] = 'addr not valid';
    return result;
  }

  const url = global.config.brc_soul_api + `/api/personbyaddr?addr=${addr}`;
  const json: any = await fetchData(url);
  return json;
}

async function getDid(did: number, mydid: number) {
  const result = {};

  if (!did) {
    result['code'] = -1;
    result['mess'] = 'did not valid';
    return result;
  }

  const url = global.config.brc_soul_api + `/api/did/${did}?mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}

async function getDids(mydid: number, size: number, page: number) {
  const result = {};

  const url = global.config.brc_soul_api + `/api/dids?mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

async function getBatchDids(dids: number[], mydid: number) {
  const result = {};

  const unq = [...new Set(dids)];
  const url = global.config.brc_soul_api + `/api/batchdids?dids=[${unq}]&mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}
