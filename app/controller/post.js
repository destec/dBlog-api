'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');

class PostController extends Controller {
  async getUserPosts() {
    const address = this.ctx.params.address;
    const authorDb = await this.service.db.getAuthorDb();
    const existed = await authorDb.query(
      _author => _author.address === address,
    );
  }
}

module.exports = PostController;
