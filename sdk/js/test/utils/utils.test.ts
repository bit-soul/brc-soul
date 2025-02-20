import * as utils from '../../src/utils/utils';

describe('utils_utils', () => {
  test('checkOPSign', () => {
    const addr = 'bc1pjvmd73c5flwrhhefkg63wvrywcrn3w8587lk4sq93gzwmltq0e8q4klv3e';
    const data = {
      p: 'brc-soul',
      op: 'did',
      opid: 1740022378,
      attr: { name: 'coffeeking001' },
      sign: 'IK1VXY2MqAlmtutBkHMBtoa/WgIb+sbRzSnw+KYs2MVoabdJ/Qw68aLAYx//MRB0TaqZMBVNb3VOGGZ59ajHouQ=',
    };
    expect(utils.checkOPSign(data, addr)).toBeTruthy();
  });

  test('signOPData', () => {
    const privateKey = 'KzYdGajcGafsKij9ysvL7pj1p8pgAFhWQJb56MN6BPJSM8dub9dS';
    const addr = 'bc1pjvmd73c5flwrhhefkg63wvrywcrn3w8587lk4sq93gzwmltq0e8q4klv3e';
    const data = {
      p: 'brc-soul',
      op: 'did',
      opid: 1740022378,
      attr: { name: 'coffeeking001' },
    };
    const signed_data = utils.signOPDate(data, addr, privateKey);
    expect(utils.checkOPSign(signed_data, addr)).toBeTruthy();
  });
});
