'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/authors/:hash', controller.author.findByHash);
  router.post('/authors/:hash', controller.author.create);
};
