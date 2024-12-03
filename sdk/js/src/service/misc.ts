import { fetchData } from '../utils/utils';

export async function getMyCoidSeq(mydid: number) {
  const result = {};

  const url = global.config.brc_soul_api + `/api/mycoidseq?mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}
