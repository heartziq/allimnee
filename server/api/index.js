import { MongoClient } from "mongodb";
import assert from "assert";

const myMongo = new MongoClient("mongodb://localhost:27017/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let conn;

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
  await conn.collection("subject").findOne({}, { projection: { _id: 0 } });

export const getAllArea = async () =>
  await conn.collection("area").findOne({}, { projection: { _id: 0 } });

export const getAllClasses = async (filter, limit, skip) => {
  // strip off undefined
  // const filterStripped = JSON.parse(JSON.stringify(filter));
  // console.log("filterStripped", filterStripped);
  // const filterModify = { ...filterStripped, _id: parseInt(filter._id, 10) };
  return await conn
    .collection("classes")
    .find(filter)
    .skip(skip)
    .limit(limit)
    .toArray();
};
