import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ProductProvider from "../../../providers/ProductProvider";

export default class HomeController {
  public async index({ view }: HttpContextContract) {
    const products = await ProductProvider.getAll();
    return view.render("home", {
      products,
    });
  }

  public async showOneProduct({ view, params }: HttpContextContract) {
    const { id } = params;
    const product = await ProductProvider.getOne(id);
    return view.render("productView", {
      product,
    });
  }
}
