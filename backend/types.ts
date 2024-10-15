import { Model } from 'mongoose';

export interface UserFields {
  email: string;
  password: string;
  displayName: string;
  avatar: string;
  role: string;
  token: string;
  googleId?: string;
  __confirmPassword: string;
}

export interface UserVirtuals {
  confirmPassword: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods, UserVirtuals>;
