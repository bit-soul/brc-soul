const dotenvx = require('@dotenvx/dotenvx');
switch(process.env.APP_ENV) {
case 'release':
  dotenvx.config({path:'./env/release.env'});
  break;
case 'unittest':
  dotenvx.config({path:'./env/unittest.env'});
  break;
default:
  dotenvx.config({path:'./env/unittest.env'});
  break;
}

require("./dist/runner.js");
