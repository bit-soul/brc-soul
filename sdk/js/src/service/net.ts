import { fetchData } from '../utils/utils';

export async function getFollower(did: number, size: number = 10, page: number = 0) {
  const result = {};

  if (!did) {
    result['code'] = -1;
    result['mess'] = 'did not valid';
    return result;
  }

  if (size > 100) {
    result['code'] = -1;
    result['mess'] = 'page size must small than 100';
    return result;
  }

  const url = global.brcsoul_sdk_config.brc_soul_api + `/api/follower?did=${did}`;
  const json: any = await fetchData(url);
  return json;
}

export async function getFollowing(did: number, size: number = 10, page: number = 0) {
  const result = {};

  if (!did) {
    result['code'] = -1;
    result['mess'] = 'did not valid';
    return result;
  }

  if (size > 100) {
    result['code'] = -1;
    result['mess'] = 'page size must small than 100';
    return result;
  }

  const url = global.brcsoul_sdk_config.brc_soul_api + `/api/following?did=${did}`;
  const json: any = await fetchData(url);
  return json;
}
