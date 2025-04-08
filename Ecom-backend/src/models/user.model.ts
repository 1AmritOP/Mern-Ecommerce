import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: "user" | "admin";
    gender: "male" | "female";
    dob: Date;
    age: number;
    createdAt: Date;
    updatedAt: Date;
}

const userShcema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please enter ID"],
    },
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      unique: [true, "Email already Exist"],
      required: [true, "Please enter name"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please enter photo"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter Date of Birth"],
    },
  },
  {
    timestamps: true,
  }
);

userShcema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;

  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

export const User = mongoose.model<IUser>("User", userShcema);
