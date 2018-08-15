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
      this.authorDb = await this.orbit.log('dblog_authors');
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

  async getPostDb(pid) {
    if (!this.postDb) this.postDb = await this.orbit.docs(`dblog_posts_${pid}`);
    return this.postDb;
  }

  async getPostHistoryDb(pid) {
    if (!this.postHistoryDb)
      this.postHistoryDb = await this.orbit.log(`dblog_posts_history_${pid}`);
    return this.postHistoryDb;
  }

  async getPostCounterDb(pid) {
    if (!this.postCounterDb)
      this.postCounterDb = await this.orbit.counter(
        `dblog_posts_counter_${pid}`,
      );
    return this.postCounterDb;
  }
}

module.exports = DbService;
