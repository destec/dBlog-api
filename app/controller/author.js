'use strict';

const Controller = require('egg').Controller;
const isIpfs = require('is-ipfs');

class AuthorController extends Controller {
  async create() {
    const { address, username } = this.ctx.request.body;
    const authorDb = await this.ctx.service.db.getAuthorDb();
    const authorId = await authorDb.add(address);
    const userInfo = { _id: authorId, username: username };
    this.ctx.logger.info(`${JSON.stringify(userInfo)} will be created`);

    const authorDetailDb = await this.ctx.service.db.getAuthorDetailDb();
    const result = await authorDetailDb.put(userInfo);
    this.ctx.body = result;
  }

  async findByHash() {
    const hash = this.ctx.params.hash;
    if (!isIpfs.multihash(hash)) this.ctx.status = 400;
    const authorDb = await this.ctx.service.db.getAuthorDb();
    const authorDetailId = await authorDb.get(hash);
    this.ctx.body = authorDetailId.payload.value;
  }
}

module.exports = AuthorController;
