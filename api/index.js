import { MongoClient } from "mongodb";
import assert from "assert";

const myMongo = new MongoClient("mongodb://localhost:27017/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let conn;
// result.db - up one level - can reuse conn;
myMongo.connect(async (err, result) => {
  assert.strictEqual(err, null);
  conn = await result.db("test");
});

export const findAllTutor = async _id =>
  await conn
    .collection("tutor")
    .find(_id)
    .toArray();

export const getAllSubjects = async () =>
  await conn.collection("subject").findOne({});
