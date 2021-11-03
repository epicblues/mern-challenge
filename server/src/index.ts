import express from "express";
import bodyParser from "body-parser";
import mongoose, { MongooseOptions } from "mongoose";
import cors from "cors";
// package.json 에서 "type" : "module" 선언을 통해 활용 가능

import postRoutes from "./routes/posts";
import userRoutes from "./routes/users";
import dotenv from "dotenv";
dotenv.config();
// .env 파일을 Node의 환경변수로 인식하게 해주는 라이브러리

const app = express();
app.use(cors());
// 미들웨어 적용 순서 매우 중요 -> 요청 처리에 본격적으로 들어가기 전에 Cross Origin을 허용하도록 해주는 미들웨어가
// 먼저 작동해야 한다.
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello to memories API");
});
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
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

// mongoose.set("useFindAndModify" as keyof MongooseOptions, true);
