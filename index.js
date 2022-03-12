const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const authRouter = require("./Routes/Auth");

const productRouter = require("./Routes/Product");

const cors = require("cors");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_MONGOODB}:${process.env.PASS_MONGOODB}@cluster0.0xzbh.mongodb.net/${process.env.NAME_PROJECT}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => res.send("datisekai"));

app.use("/api/auth", authRouter);

app.use("/api", productRouter);

const PORT = process.env.PORT || 5098;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
