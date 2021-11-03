export type PostVo = {
  _id?: string;
  creator?: string;
  likes?: [string];
  message?: string;
  selectedFile?: string;
  tags?: [string];
  title?: string;
  __v?: number;
  createdAt?: Date;
  name?: string;
};

export type UserVo = {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
};
