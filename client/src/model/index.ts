export type PostVo = {
  _id?: string;
  creator?: string;
  likeCount?: number;
  message?: string;
  selectedFile?: string;
  tags?: [string];
  title?: string;
  __v?: number;
  createdAt?: Date;
};

export type UserVo = {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
};
