import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { USER_ID } from "../constants";

// User wants to like posts
// Click the like button => auth middleware (next) => like controller

const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(
        token,
        process.env.UUID_SECRET as string
      ) as jwt.JwtPayload;
      req[USER_ID] = decodedData?.id;
    } else {
      decodedData = jwt.decode(token); // Google의 Token은 이미 인증을 마친 것이므로 verify 할 필요가 없다?
      req[USER_ID] = decodedData?.sub; // Google Token에서 User를 구분하는 식별자
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "you have no authorized token" });
  }
};

export default auth;
