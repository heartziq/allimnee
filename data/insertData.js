const { MongoClient } = require("mongodb");
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { mongodbUri, nodeEnv } = require("../config");

console.log(`environment: ${nodeEnv}`)

const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "tutor.json"), "utf-8")
);

// initiate Mongo Connection
const myMongo = new MongoClient(mongodbUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

myMongo.connect((err, result) => {
  assert.strictEqual(err, null);
  result
    .db("test")
    .collection("tutor")
    .insertMany(data)
    .then(res => {
      const msg = `row(s) inserted: ${res.insertedCount}`;
      console.info(msg);

      // close DB connection
      return result.close();
    })
    .catch(error => console.error(error.stack));
});
