const { MongoClient } = require("mongodb");
const assert = require("assert");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./data/tutor.json", "utf-8"));

// initiate Mongo Connection
const myMongo = new MongoClient("mongodb://localhost:27017/test", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
myMongo.connect((err, result) => {
  result
    .db("test")
    .collection("tutor")
    .insertMany(data)
    .then(res => {
      console.info(res.insertedCount)
      return result.close();
    }).catch(error => console.error(error.stack))
});
