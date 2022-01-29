import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ProductProvider from "../../../providers/ProductProvider";

export default class ProductsController {
  public async index({ view }: HttpContextContract) {
    const products = await ProductProvider.getAll();
    return view.render("showAllAdmin", {
      products,
      url: `/api/v1/product/`,
    });
  }

  public async create({ view }: HttpContextContract) {
    return view.render("add_product");
  }

  public async store({ request, response, session }: HttpContextContract) {
    const { name, description, category, price, stock } = request.body();

    const image = request.file("image", {
      size: "1mb",
      extnames: ["jpg", "png", "webp"],
    });

    if (!image?.isValid) {
      session.flash({
        error: "Error de formato. Utilizar [ jpg - png - webp ]",
      });
      return response.redirect().back();
    }
    if (image) {
      // await image.move(Application.tmpPath("uploads"));
      await image.moveToDisk("../../public/productsImage", {
        name: image.clientName,
      });
    }

    const product = {
      name,
      description,
      category,
      image: `/productsImage/${image?.fileName}`,
      price,
      stock,
    };
    await ProductProvider.addProduct(product);
    session.flash({ msg: "Producto agregado" });
    return response.redirect().back();
  }

  public async show({ view, params }: HttpContextContract) {
    console.log("Show");
    const { id } = params;
    const product = await ProductProvider.getOne(id);
    return view.render("productView", {
      product,
    });
  }

  public async edit({ view, params }: HttpContextContract) {
    const { id } = params;

    return view.render("updateProduct", {
      url: `/api/v1/product/${id}`,
    });
  }

  public async update({ request, response, params }: HttpContextContract) {
    // const { name, description, category, price, stock } = request.body();
    const { id } = params;
    let datas = request.body();
    const image = request.file("image", {
      size: "1mb",
      extnames: ["jpg", "png", "webp"],
    });

    if (!image?.isValid) {
      // return response.redirect().back();
    }
    if (image) {
      // await image.move(Application.tmpPath("uploads"));
      await image.moveToDisk("../../public/productsImage", {
        name: image.clientName,
      });

      datas = {
        ...datas,
        image: `/productsImage/${image?.fileName}`,
      };
    }

    Object.keys(datas).forEach((key) => {
      if (datas[key] === null) {
        delete datas[key];
      }
    });

    if (Object.entries(datas).length === 0) {
      console.log("aca");
      return response.status(200);
    } else {
      await ProductProvider.updateById(id, datas);
      return response.status(202);
    }

    // return response.redirect().back();

    // return response.redirect("/");

    // const data = request.body();
    // console.log(data);

    // const image = request.file("image", {
    //   size: "1mb",
    //   extnames: ["jpg", "png"],
    // });

    // if (!image?.isValid) {
    //   session.flash({ error: "Error de formato. Utilizar [ jpg - png ]" });
    //   return response.redirect().back();
    // }
    // if (image) {
    //   // await image.move(Application.tmpPath("uploads"));
    //   await image.moveToDisk("../../public/productsImage", {
    //     name: image.clientName,
    //   });
    // }

    // const product = {
    //   name,
    //   description,
    //   category,
    //   image: `/productsImage/${image?.fileName}`,
    //   price,
    //   stock,
    // };
    // await ProductProvider.addProduct(product);
    // session.flash({ msg: "Producto agregado" });
    // return response.redirect().back();
  }

  public async destroy({ params }: HttpContextContract) {
    console.log("DESTROY");
    const { id } = params;
    await ProductProvider.deleteById(id);
  }
}
