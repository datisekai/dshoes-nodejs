const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const authRouter = require("./Routes/Auth");

const productRouter = require("./Routes/Product");

const commentRouter = require("./Routes/Comment");

const orderRouter = require("./Routes/Order");

const roleCateRouter = require("./Routes/Role_Cate");
const statisticRouter = require("./Routes/Statistic");

const cors = require("cors");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/dshoes`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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

app.use("/api/products", productRouter);
app.use("/api/comments", commentRouter);
app.use("/api/orders", orderRouter);
app.use("/api/role_cate", roleCateRouter);
app.use("/api/statistic", statisticRouter);
const PORT = process.env.PORT || 5098;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
