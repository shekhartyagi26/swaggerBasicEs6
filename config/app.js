const path = require('path');
const env = require(path.resolve('./lib/env.js'));
const cfenv = require('cfenv');
const appenv = cfenv.getAppEnv();

const localConfig = {
  url: 'http://localhost:3003',
  port: 3003
};

const onlineConfig = {
  url: appenv.url,
  port: appenv.port
};

module.exports = env.isLocal() ? localConfig : onlineConfig;
