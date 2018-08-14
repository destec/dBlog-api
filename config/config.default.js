'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534238370763_9343';

  // add your config here
  config.middleware = [];

  config.ipfs = {
    host: 'localhost',
    port: '5001',
    protocol: 'http',
  };

  return config;
};
