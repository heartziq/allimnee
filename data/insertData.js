const { MongoClient } = require("mongodb");
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { mongodbUri, nodeEnv } = require("../config");

const tutors = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "tutor.json"), "utf-8")
);

const subjects = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "filter", "subject.json"), "utf-8")
);

const area = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "filter", "area.json"), "utf-8")
);

const classList = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "classes.json"), "utf-8")
);

// initiate Mongo Connection
const myMongo = new MongoClient(mongodbUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

myMongo.connect(async (err, result) => {
  assert.strictEqual(err, null);
  try {
    // insert tutors
    const tutorsInserted = await result
      .db("test")
      .collection("tutor")
      .insertMany(tutors);

    console.info(`tutor row(s) inserted: ${tutorsInserted.insertedCount}`);

    // // insert subjects
    const subjectsInserted = await result
      .db("test")
      .collection("subject")
      .insertOne(subjects);

    console.info(`subject row(s) inserted: ${subjectsInserted.insertedCount}`);

    // // insert area
    const areasInserted = await result
      .db("test")
      .collection("area")
      .insertOne(area);

    console.info(`areas row(s) inserted: ${areasInserted.insertedCount}`);

    // insert classList
    const insertClassList = await result
      .db("test")
      .collection("classes")
      .insertMany(classList);

    console.info(`classes row(s) inserted: ${insertClassList.insertedCount}`);

    await result.close();
  } catch (err) {
    console.error(err);
  }
});
