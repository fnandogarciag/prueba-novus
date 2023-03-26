const { MongoClient, ObjectId } = require("mongodb");

const DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_URI = process.env.MONGO_URL;
let instance = null;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }
  // const mongoDB = MongoLib.getInstance();
  static getInstance() {
    if (!instance) {
      instance = new MongoLib();
    }
    return instance;
  }

  async connect() {
    if (!MongoLib.connection) {
      await this.client.connect();
      MongoLib.connection = this.client.db(this.dbName);
      return MongoLib.connection;
    }
    return MongoLib.connection;
  }

  async getAll(collection, query) {
    const db = await this.connect();
    return db.collection(collection).find(query).toArray();
  }

  async get(collection, id) {
    const db = await this.connect();
    return db.collection(collection).findOne({ _id: id });
  }

  async create(collection, data) {
    const db = await this.connect();
    const rta = await db.collection(collection).insertOne(data);
    return this.get(collection, rta.insertedId);
  }
}

module.exports = MongoLib;
