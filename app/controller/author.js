'use strict';

const Controller = require('egg').Controller;

class AuthorController extends Controller {
  async create() {
    const authorDb = await this.ctx.service.db.getAuthorDb();
    // const hash = await authorDb.add({ name: 1 });

    this.ctx.body = result;
  }

  async findByHash() {
    const hash = this.ctx.params.hash;
    // const
  }
}

module.exports = AuthorController;
