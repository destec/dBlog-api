'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');

class PostController extends Controller {
  async getUserPosts() {
    const aid = this.ctx.params.address;
    const postDb = await this.service.db.getPostDb(aid);
    // const result = await postDb.
  }
}

module.exports = PostController;
