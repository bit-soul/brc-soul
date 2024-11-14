import fetch from 'node-fetch';

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retryTimes(fun: Function, times: number, interval: number) {
  let last_error;

  for (let retry_cnt = 0; retry_cnt < times; ++retry_cnt) {
    try {
      return await fun();
    } catch (error) {
      await sleep(interval);
      last_error = error;
    }
  }

  throw last_error;
}

export async function fetchWithTimeout(
  url: string,
  options: fetch.RequestInit = {},
  timeout: number = 15000,
): Promise<fetch.Response> {
  const timeoutPromise = new Promise<fetch.Response>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request timed out: ' + url));
    }, timeout);
  });

  return Promise.race([fetch(url, options), timeoutPromise]);
}
