//choose config file
switch (process.env.APP_ENV) {
  case 'release':
    global.env = 'release';
    global.config = require('./config/release');
    break;
  case 'unittest':
    global.env = 'unittest';
    global.config = require('./config/unittest');
    break;
  default:
    global.env = 'release';
    global.config = require('./config/release');
    break;
}
