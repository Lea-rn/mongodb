const express = require("express");

const app = express();
const mongoose = require("mongoose");

var url = "mongodb://localhost:27017/people";

const schemaPeople = new mongoose.Schema({
  ////// type of date (document)
  firstName: String,
  lastName: String,
  age: Number,
  country: String,
});

const Student = mongoose.model("student", schemaPeople); /////// collection : students ; type of data document

mongoose.connect(url).then(() => console.log("connected")); ///// connection of code with compass

////// create ::
app.get("/", async (req, res) => {
  /////// to create one document :::
  // await student.create({
  //   firstName: "mouna",
  //   lastName: "hidri",
  //   age: 20,
  //   counrty: "tunisia",
  // });

  await Student.insertMany([
    {
      firstName: "mouna",
      lastName: "hidri",
      age: 20,
      country: "tunisia",
    },

    {
      firstName: "imen",
      lastName: "zouid",
      age: 22,
      country: "tunisia",
    },

    {
      firstName: "houssemeddine",
      lastName: "henchir",
      age: 23,
      country: "tunisia",
    },
  ]);

  res.send("student inserted");
});

/////// read ::

app.get("/readdata", async (req, res) => {
  try {
    /////// find all documents :

    //   const docs = await Student.find();
    //   console.log(docs);
    //   res.send(docs);
    // } catch (err) {
    //   res.status(500).send(err);
    // }

    /////// find one (first method) :

    //   const docs = await Student.find({ _id: "69ebbbd599327b41e474db73" });
    //   console.log(docs);
    //   res.send(docs);
    // } catch (err) {
    //   res.status(500).send(err);
    // }

    ///// find one second method ::

    //   const docs = await Student.findOne({ firstName: "imen" });
    //   console.log(docs);
    //   res.send(docs);
    // } catch (err) {
    //   res.status(500).send(err);
    // }

    ////////// find by id  ::
    const docs = await Student.findById({ _id: "69ebbbd599327b41e474db75" });
    console.log(docs);
    res.send(docs);
  } catch (err) {
    res.status(500).send(err);
  }
});

//////// update ::

app.get("/updatedata", async (req, res) => {
  //////// update One
  // try {
  //   const result = await Student.updateOne(
  //     { _id: "69ebbbd599327b41e474db73" },
  //     {
  //       $set: {
  //         firstName: "achref",
  //         lastName: "mechergui",
  //       },
  //     },
  //   );

  //   res.send({
  //     message: "updated successfully .... ",
  //     result,
  //   });
  // } catch (err) {
  //   res.status(500).send(err);
  // }

  ////////////////// update Many ::

  try {
    const result = await Student.updateMany(
      { country: "tunisia" },
      {
        $set: {
          age: 10,
        },
      },
    );

    res.send({
      message: "updated successfully .... ",
      result,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

//////////////// delete :::

app.get("/delete-one", async (req, res) => {
  ////// delete one ::
  try {
    const result = await Student.deleteOne({ _id: "69ebc1a792f91729b8315af5" });
    res.send({
      message: "student deleted !!",
      result,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/delete-many", async (req, res) => {
  ////// delete many :::
  try {
    const result = await Student.deleteMany({ age: 10 });
    res.send({
      message: "students deleted !!",
      result,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log("server run on port 3000"));
