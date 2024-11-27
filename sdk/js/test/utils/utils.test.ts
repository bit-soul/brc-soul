import * as utils from '../../src/utils/utils';

describe('utils_utils', () => {
  test('checkSign', () => {
    const addr = 'bc1pztae8f9p4xzmkmy9l0ej5400pv24tgpqtev70hmc7wasajl3jcsqyke5l3';
    const data = {
      p: 'brc-soul',
      op: 'did',
      opid: 1732678235,
      attr: { name: 'coffeeking002' },
      sign: 'INF4X/NKYpOlqBfABiSA5srpU8Yn4H5rgrLSYwuhz/DVFiU3HEP4JZrCAXG/YDlJUVfzU0oKflypbMOBjbil2bE=',
    };
    expect(utils.checkSign(data, addr)).toBeTruthy();
  });
});
