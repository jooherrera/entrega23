import mongoose from "mongoose";

type Product = {
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  stock: number;
};

const ProductSchema = new mongoose.Schema<Product>(
  {
    name: String,
    description: String,
    category: String,
    image: String,
    price: String,
    stock: String,
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<Product>("Product", ProductSchema);
