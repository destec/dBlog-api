'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');

class PostController extends Controller {
  async getUserPosts() {
    const address = this.ctx.params.address;
    const authorDb = await this.service.db.getAuthorDb();
    const resultList = await authorDb.query(
      _author => _author.address === address,
    );
    const authorInfo = _.first(resultList);
    const result = authorInfo.posts || [];
    this.ctx.body = result;
  }

  async addPosts() {
    const post = this.ctx.request.body;
  }
}

module.exports = PostController;
