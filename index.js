const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const authRouter = require("./Routes/Auth");

const productRouter = require("./Routes/Product");

const commentRouter = require('./Routes/Comment')

const orderRouter = require('./Routes/Order')

const roleCateRouter = require('./Routes/Role_Cate')

const cors = require("cors");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://datisekai:bedatnee312@cluster0.0xzbh.mongodb.net/dshoes?retryWrites=true&w=majority`,
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

app.use("/api/products", productRouter);
app.use("/api/comments", commentRouter);
app.use("/api/orders",orderRouter)
app.use('/api/role_cate',roleCateRouter)
const PORT = process.env.PORT || 5098;

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
console.log(mongoose.Types.ObjectId.isValid('622d953bf45eb0e2e41aab55'))