import { MongoClient } from "mongodb";
import assert from 'assert';

const myMongo = new MongoClient("mongodb://localhost:27017/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let conn;
myMongo.connect(async (err, result) => {
  assert.strictEqual(err, null);
  conn = await result.db("test").collection("tutor");
});

export const findAllTutor = async _id => await conn.find(_id).toArray();
