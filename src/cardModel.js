const mongoose = require("mongoose");


// card model
const Card = mongoose.model("paymentCardDetails", {
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  cardHolder: {
    type: String,
    required: true
  },
  cardCvv: {
    type: String,
    required: true
  },
  cardMonth: {
    type: String,
    required: true
  },
  cardYear: {
    type: String,
    required: true
  }
});

module.exports={Card}

// newCard
//     .save()
//     .then(() => res.status(201).send("Details saved successfully!"))
//     .catch((error) => {
//       if (error) res.status(400).send("Not saved successfully!");
//     });
