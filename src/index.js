const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Card } = require("./cardModel");

const port = 8080;

// mongoose connection
mongoose.connect(
  "mongodb+srv://vishaldeepverma:12345@demo-cluster.epr4g.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// all cors allowed
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json()); //Used to parse JSON bodies


app.post("/", (req, res) => {
  Card.findOne({ cardNumber: req.body.cardNumber }, function (error, result) {
    
    // error found
    if (error) {
      console.log("error", error);
      return res
        .status(200)
        .json({ error: true, message: "Something went wrong!" });
    } 
    // duplicate details found
    else if (result) {
      console.log("result", result);
      return res
        .status(200)
        .json({ error: true, message: "Card details already exists!" });
    } 
    // save card details
    else {
      const newCard = new Card(req.body);

      newCard.save(function (error, result) {
        if (error) {
          return res
            .status(200)
            .json({ error: true, message: "Something went wrong" });
        }
        return res
          .status(201)
          .json({ error: false, message: "Card Details saved successfully" });
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
