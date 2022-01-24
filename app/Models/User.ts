import { Schema, model } from "@ioc:Mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model("User", userSchema);
