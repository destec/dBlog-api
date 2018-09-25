'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/authors/:address', controller.author.getByAddress);
  router.post('/authors', controller.author.create);
  router.get('/authors/:address/posts', controller.post.getUserPosts);
  router.post('/authors/:address/post', controller.post.createPost);
};
