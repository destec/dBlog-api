const Service = require('egg').Service;
const IPFS = require('ipfs-api');
const OrbitDB = require('orbit-db');

class DbService extends Service {
  constructor(ctx) {
    const ipfsInstance = IPFS({
      host: this.app.config.ipfs.host,
      port: this.app.config.ipfs.port,
      protocol: this.app.config.ipfs.protocol || 'http',
    });
    orbit = new OrbitDB(ipfsInstance);
    this.authorDb = null;
    this.postDb = null;
    this.postHistoryDb = null;
    this.postCounterDb = null;
  }

  async getAuthorDb() {
    if (!this.authorDb) this.authorDb = await orbit.log('dblog_authors');
    return this.authorDb;
  }

  async getPostDb(pid) {
    if (!this.postDb) this.postDb = await orbit.docs(`dblog_posts_${pid}`);
    return this.postDb;
  }

  async getPostHistoryDb(pid) {
    if (!this.postHistoryDb)
      this.postHistoryDb = await orbit.log(`dblog_posts_history_${pid}`);
    return this.postHistoryDb;
  }

  async getPostCounterDb(pid) {
    if (!this.postCounterDb)
      this.postCounterDb = await orbit.counter(`dblog_posts_counter_${pid}`);
    return this.postCounterDb;
  }
}

module.exports = DbService;
