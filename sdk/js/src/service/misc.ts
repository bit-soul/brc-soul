import { fetchData } from '../utils/utils';

export async function getMyCoidSeq(mydid: number) {
  const result = {};

  if (!mydid) {
    result['code'] = -1;
    result['mess'] = 'did not valid';
    return result;
  }

  const url = global.brcsoul_sdk_config.brc_soul_api + `/api/mycoidseq?mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}
