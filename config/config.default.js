'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534238370763_9343';

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your config here
  config.middleware = [];

  config.ipfs = {
    host: 'localhost',
    port: '15001',
    protocol: 'http',
  };

  return config;
};
