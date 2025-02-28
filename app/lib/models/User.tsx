import mongoose, { Schema, Document, Model } from "mongoose";

enum UserRole {
  ADMIN = 1,
  EMPLOYEE = 2,
}

enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 2,
}

export interface UserDocument extends Document {
  username:string
  fname: string;
  lname: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
}

const UserSchema: Schema<UserDocument> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: Number,
      enum: [UserRole.ADMIN, UserRole.EMPLOYEE],
      default: UserRole.EMPLOYEE,
    },
    status: {
      type: Number,
      enum: [UserStatus.ACTIVE, UserStatus.INACTIVE],
      default: UserStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

const UserModel: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema)
export default UserModel;
