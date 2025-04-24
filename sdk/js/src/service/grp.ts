import { fetchData } from '../utils/utils';

const sdkglb = require('../global');

export async function getGrp(grp: number, mydid: number = 0) {
  const result = {};

  if (!grp) {
    result['code'] = -1;
    result['mess'] = 'grp not valid';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/grp/${grp}?mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getGrps(mydid: number = 0, size: number = 10, page: number = 0) {
  const result = {};

  if (size > 100) {
    result['code'] = -1;
    result['mess'] = 'page size must small than 100';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/grps?mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getMyGrps(mydid: number, size: number = 10, page: number = 0) {
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

  const url = sdkglb.config.brc_soul_api + `/api/mygrps?mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getBatchGrps(grps: number[], mydid: number = 0) {
  const result = {};

  if (!grps || grps.length <= 0 || grps.length > 100) {
    result['code'] = -1;
    result['mess'] = 'grps size must small than 100';
    return result;
  }

  const unq = [...new Set(grps)];
  const url = sdkglb.config.brc_soul_api + `/api/batchgrps?grps=[${unq}]&mydid=${mydid}`;
  const json: any = await fetchData(url);

  return json;
}

export async function getGrpMembers(grp: number, mydid: number = 0, size: number = 10, page: number = 0) {
  const result = {};

  if (!grp) {
    result['code'] = -1;
    result['mess'] = 'grp not valid';
    return result;
  }

  if (size > 100) {
    result['code'] = -1;
    result['mess'] = 'page size must small than 100';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/grpmembers?grp=${grp}&mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getLeaveSBT(grp: number, mydid: number) {
  const result = {};

  if (!grp || !mydid) {
    result['code'] = -1;
    result['mess'] = 'grp or did not valid';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/leavesbt?grp=${grp}&mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}
