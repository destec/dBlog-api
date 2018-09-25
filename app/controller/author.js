'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');
const Web3 = require('@0xproject/web3-wrapper').Web3Wrapper;

class AuthorController extends Controller {
  async create() {
    const { address, username } = this.ctx.request.body;
    const authorDb = await this.ctx.service.db.getAuthorDb();
    const existed = await authorDb.query(
      _author => _author.address === address,
    );
    const userInfo = { address, username };
    if (_.isEqual(_.first(existed), userInfo)) {
      this.logger.warn(
        `user [${userInfo.address}] found with no change, just return back`,
      );
      this.ctx.body = _.first(existed);
      return;
    }
    // TODO: need to ensure the authorization but not overwrite
    if (!_.isEmpty(existed)) authorDb.del(address);
    this.ctx.logger.info(`${JSON.stringify(userInfo)} will be created`);
    await authorDb.put(userInfo);

    this.ctx.body = userInfo;
  }

  async getByAddress() {
    const address = this.ctx.params.address;
    if (!Web3.isAddress(address)) return (this.ctx.status = 400);
    const authorDb = await this.ctx.service.db.getAuthorDb();
    const detail = authorDb.query(author => author.address === address);
    this.ctx.body = detail;
  }
}

module.exports = AuthorController;
