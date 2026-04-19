const express = require("express");

const app = express();
const mongo = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017";

app.get("/", (req, res) => {
  console.log("1");
  mongo.connect(url, (err, result) => {
    if (err) throw err;
    if (result) {
      console.log("2");
      var db = result.db("mytest");
    }

    db.createCollection("ayhaja", (err, result) => {
      if (err) throw err;
      else console.log("collection and database created !!!");
    });
  });
});

app.listen(3000, () => console.log("server run on port 3000"));
