import PostMessage from "../models/postMessage";

export const getPosts = async (req, res) => {
  try {
    const PostMessages = await PostMessage.find();

    res.status(200).json(PostMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  // 폼 데이터를 받아온다.
  const newPost = new PostMessage(post);
  // 스키마에 적합한 PostMessage document 생성
  try {
    await newPost.save();
    // 실제로 db와 소통하는 부분
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
