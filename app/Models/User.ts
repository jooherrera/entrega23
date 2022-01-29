import mongoose from "mongoose";
import Hash from "@ioc:Adonis/Core/Hash";

type Info = {
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  rememberMeToken: string | null;
  isComplete: boolean;
  avatar: string;
  info: Info;
};

const UserSchema = new mongoose.Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    rememberMeToken: String,
    isComplete: { type: Boolean, default: false },
    avatar: {
      type: String,
      required: false,
      default: "/avatar/default.png",
    },
    info: {
      nombre: {
        type: String,
        default: "",
      },
      apellido: {
        type: String,
        default: "",
      },
      direccion: {
        type: String,
        default: "",
      },
      telefono: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function () {
  if (this.password && this.isModified("password")) {
    this.password = await Hash.make(this.password);
  }
});

export default mongoose.model<User>("User", UserSchema);
