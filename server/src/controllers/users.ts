import { RequestHandler } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const signin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await compare(password, existingUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        email: existingUser.email,
        name: existingUser.name,
        id: existingUser._id,
      },
      process.env.UUID_SECRET as string,
      { expiresIn: 3600 }
    );
    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    // 서버에서 발생한 에러
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup: RequestHandler = async (req, res) => {
  // 회원가입
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User Already Exists" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords dont match" });

    const hashedPw = await hash(password, 10);

    const result = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPw,
    });
    const token = jwt.sign(
      {
        email: result.email,
        name: result.name,
        id: result._id,
      },
      process.env.UUID_SECRET as string,
      { expiresIn: 3600 }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
