import { fetchData } from '../utils/utils';

async function getVcc(vcc: number, mydid: number) {
  const result = {};

  if (!vcc) {
    result['code'] = -1;
    result['mess'] = 'vcc not valid';
    return result;
  }

  const url = global.config.brc_soul_api + `/api/vcc/${vcc}?mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}

async function getVccs(mydid: number, size: number, page: number) {
  const result = {};

  const url = global.config.brc_soul_api + `/api/vccs?mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

async function getMyVccs(mydid: number, size: number, page: number) {
  const result = {};

  const url = global.config.brc_soul_api + `/api/myvccs?mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

async function getBatchVccs(vccs: number[], mydid: number) {
  const result = {};

  const unq = [...new Set(vccs)];
  const url = global.config.brc_soul_api + `/api/batchvccs?vccs=[${unq}]&mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}

async function getMembers(vcc: number, mydid: number, size: number, page: number) {
  const result = {};

  const url = global.config.brc_soul_api + `/api/members?vcc=${vcc}&mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

async function getMyCoidSeq(mydid: number) {
  const result = {};

  const url = global.config.brc_soul_api + `/api/mycoidseq?mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}

async function getBurnSBT(vcc: number, mydid: number) {
  const result = {};

  const url = global.config.brc_soul_api + `/api/burnsbt?vcc=${vcc}&mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}
