import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

// package.json 에서 "type" : "module" 선언을 통해 활용 가능

import postRoutes from "./routes/posts";

import dotenv from "dotenv";
dotenv.config();
// .env 파일을 Node의 환경변수로 인식하게 해주는 라이브러리

const app = express();
app.use("/posts", postRoutes);

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

// mongoose.set("useFindAndModify" as mongoose.MongooseOptions, false);
