import { fetchData } from '../utils/utils';

export async function getMembers(vcc: number, mydid: number, size: number, page: number) {
  const result = {};

  const url = global.config.brc_soul_api + `/api/members?vcc=${vcc}&mydid=${mydid}&size=${size}&page=${page}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getMyCoidSeq(mydid: number) {
  const result = {};

  const url = global.config.brc_soul_api + `/api/mycoidseq?mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}
