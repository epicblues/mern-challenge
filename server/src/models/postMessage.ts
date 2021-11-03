import * as mongoose from "mongoose";

export interface Post {
  title: string;
  message: string;
  creator: string;
  tags: [string];
  selectedFile: string;
  likes: [string];
  createdAt: Date;
  name: string;
}

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  name: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postMessage = mongoose.model("PostMessage", postSchema);
// PostMessage라는 Model을 postSchema 제약조건을 사용해서 등록.

export default postMessage;
