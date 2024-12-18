import { fetchData } from '../utils/utils';

const sdkglb = require('../global');

export async function getMyCoidSeq(mydid: number) {
  const result = {};

  if (!mydid) {
    result['code'] = -1;
    result['mess'] = 'did not valid';
    return result;
  }

  const url = sdkglb.config.brc_soul_api + `/api/mycoidseq?mydid=${mydid}`;
  const json: any = await fetchData(url);
  return json;
}
