'use strict';

function isInnerIp(ip) {
  if (['::1', '127.0.0.1'].indexOf(ip) !== -1) return true;
  return false;
}

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534238370763_9343';

  config.security = {
    csrf: {
      ignore: ctx => isInnerIp(ctx.ip),
    },
  };

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
