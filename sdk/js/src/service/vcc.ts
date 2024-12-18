import { fetchData } from '../utils/utils';

const sdkglb = require('../global');

export async function getVcc(vcc: number, mydid: number = 0) {
  const result = {};

  if (!vcc) {
    result['code'] = -1;
    result['mess'] = 'vcc not valid';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/vcc/${vcc}?mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getVccs(mydid: number = 0, size: number = 10, page: number = 0) {
  const result = {};

  if (size > 100) {
    result['code'] = -1;
    result['mess'] = 'page size must small than 100';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/vccs?mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getMyVccs(mydid: number, size: number = 10, page: number = 0) {
  const result = {};

  if (!mydid) {
    result['code'] = -1;
    result['mess'] = 'did not valid';
    return result;
  }

  if (size > 100) {
    result['code'] = -1;
    result['mess'] = 'page size must small than 100';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/myvccs?mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getBatchVccs(vccs: number[], mydid: number = 0) {
  const result = {};

  if (vccs.length <= 0 || vccs.length > 100) {
    result['code'] = -1;
    result['mess'] = 'coids size must small than 100';
    return result;
  }

  const unq = [...new Set(vccs)];
  const url = sdkglb.config.brc_soul_api + `/api/batchvccs?vccs=[${unq}]&mydid=${mydid}`;
  const json: any = await fetchData(url);

  return json;
}

export async function getVccMembers(vcc: number, mydid: number = 0, size: number = 10, page: number = 0) {
  const result = {};

  if (!vcc) {
    result['code'] = -1;
    result['mess'] = 'vcc not valid';
    return result;
  }

  if (size > 100) {
    result['code'] = -1;
    result['mess'] = 'page size must small than 100';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/vccmembers?vcc=${vcc}&mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getBurnSBT(vcc: number, mydid: number) {
  const result = {};

  if (!vcc || !mydid) {
    result['code'] = -1;
    result['mess'] = 'vcc or did not valid';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/burnsbt?vcc=${vcc}&mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}
