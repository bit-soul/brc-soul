beforeAll(() => {
  global.env = 'unittest';
  global.config = require('../src/config/unittest');
});

afterAll(() => {
  null;
});
