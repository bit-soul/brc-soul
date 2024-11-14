const pgsql = require('pg');

beforeAll(() => {
  global.env = 'local';
  global.config = require('../src/config/local');
  pgsql.types.setTypeParser(20, parseInt); //INT8 type number is 20
  global.dbPool = new pgsql.Pool(global.config.pg_config);
});

afterAll(() => {
  global.dbPool.end();
});
