import { fetchData } from '../utils/utils';

async function getGrp(grp: number, mydid: number) {
  const result = {};

  if (!grp) {
    result['code'] = -1;
    result['mess'] = 'grp not valid';
    return result;
  }

  const url = global.config.brc_soul_api + `/api/grp/${grp}?mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}

async function getGrps(mydid: number, size: number, page: number) {
  const result = {};

  const url = global.config.brc_soul_api + `/api/grps?mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

async function getMyGrps(mydid: number, size: number, page: number) {
  const result = {};

  const url = global.config.brc_soul_api + `/api/mygrps?mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

async function getBatchGrps(grps: number[], mydid: number) {
  const result = {};

  const unq = [...new Set(grps)];
  const url = global.config.brc_soul_api + `/api/batchgrps?grps=[${unq}]&mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}

async function getLeaveSBT(grp: number, mydid: number) {
  const result = {};

  if (!grp) {
    result['code'] = -1;
    result['mess'] = 'grp not valid';
    return result;
  }

  const url = global.config.brc_soul_api + `/api/leavesbt?grp=${grp}&mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}
