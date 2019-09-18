import { MongoClient } from "mongodb";

const myMongo = new MongoClient("mongodb://localhost:27017/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let conn;
myMongo.connect(async (err, result) => {
  conn = await result.db("test").collection("tutor");
});

export const findAllTutor = async (_id) => {
  console.log(`findAllTutor: ${JSON.stringify(_id)}`)
  return await conn.find(_id).toArray();
}