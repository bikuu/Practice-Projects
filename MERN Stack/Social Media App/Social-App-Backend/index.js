const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
dotenv.config();

const userRoutes = require("./Routes/users");
const authRoutes = require("./Routes/auth");
const postRoutes = require("./Routes/posts");
const conversationRoutes = require("./Routes/conversation");
const messageRoutes = require("./Routes/messages");

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected To Database");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage, preservePath: true });
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).send("File uploaded successfully");
  } catch (error) {
    console.log(error);
  }
});
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/conversation", conversationRoutes);
app.use("/messages", messageRoutes);
app.listen(5000, () => {
  console.log("Connected to Port 5000");
});
