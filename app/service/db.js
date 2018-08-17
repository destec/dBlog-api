const Service = require('egg').Service;
const IPFS = require('ipfs-api');
const OrbitDB = require('orbit-db');

class DbService extends Service {
  constructor(ctx) {
    super(ctx);
    const ipfsInstance = IPFS({
      host: this.app.config.ipfs.host,
      port: this.app.config.ipfs.port,
      protocol: this.app.config.ipfs.protocol || 'http',
    });
    this.orbit = new OrbitDB(ipfsInstance);
    this.authorDb = null;
    this.authorDetailDb = null;
    this.postDb = null;
    this.postHistoryDb = null;
    this.postCounterDb = null;
  }

  async getAuthorDb() {
    if (!this.authorDb) {
      this.authorDb = await this.orbit.docs('dblog_authors', {
        indexBy: 'address',
      });
      await this.authorDb.load();
    }
    return this.authorDb;
  }

  async getAuthorDetailDb() {
    if (!this.authorDetailDb) {
      this.authorDetailDb = await this.orbit.docs('dblog_author_details');
      await this.authorDetailDb.load();
    }
    return this.authorDetailDb;
  }

  async getPostDb(aid) {
    if (!this.postDb) this.postDb = await this.orbit.log(`dblog_posts_${aid}`);
    return this.postDb;
  }

  async getPostHistoryDb(aid) {
    if (!this.postHistoryDb)
      this.postHistoryDb = await this.orbit.log(`dblog_posts_history_${aid}`);
    return this.postHistoryDb;
  }

  async getPostCounterDb(aid) {
    if (!this.postCounterDb)
      this.postCounterDb = await this.orbit.counter(
        `dblog_posts_counter_${aid}`,
      );
    return this.postCounterDb;
  }
}

module.exports = DbService;
