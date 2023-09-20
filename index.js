// index.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());


const productRoute = require("./product");
const dealRoute = require("./deal");


async function connectToMongoDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://Sawant_anand:Mongo1234@cluster0.vgsic6p.mongodb.net/your-database-name",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

connectToMongoDB();



app.use("/products", productRoute);
app.use("/deals", dealRoute);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
