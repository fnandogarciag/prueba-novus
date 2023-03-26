const MongoLib = require("../lib/mongo.lib");

class HistoryService {
  constructor() {
    this.collection = "histories";
    this.mongoDB = MongoLib.getInstance();
  }

  getHistories(query) {
    return this.mongoDB.getAll(this.collection, query);
  }

  createHistory(newBook) {
    return this.mongoDB.create(this.collection, newBook);
  }
}

module.exports = HistoryService;
