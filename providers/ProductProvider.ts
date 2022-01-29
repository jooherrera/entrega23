import Product from "App/Models/Product";

type product = {
  name: String;
  description: String;
  category: String;
  image: String;
  price: Number;
  stock: Number;
};

export default class ProductProvider {
  public static async getAll() {
    return await Product.find();
  }

  public static async addProduct(product: product) {
    const newProduct = new Product(product);
    return await newProduct.save();
  }

  public static async getOne(id) {
    return await Product.findById(id);
  }

  public static async updateById(id, data) {
    return await Product.findByIdAndUpdate(id, data);
  }
  public static async deleteById(id) {
    return await Product.findByIdAndDelete(id);
  }
}
