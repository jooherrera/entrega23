import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import UserProvider from "../../../providers/UserProvider";

export default class UsersController {
  public async cart({ view }) {
    return view.render("cart");
  }

  public async edit({ view, params }: HttpContextContract) {
    const { id } = params;
    return view.render("updateUser", { url: `/user/${id}` });
  }

  public async update({ request, response, params }) {
    const { id } = params;
    console.log(params.id);
    let data = {};
    let info = request.body();

    Object.keys(info).forEach((key) => {
      if (info[key] === null) {
        delete info[key];
      }
    });

    const image = request.file("image", {
      size: "1mb",
      extnames: ["jpg", "png", "webp"],
    });

    if (image) {
      // await image.move(Application.tmpPath("uploads"));
      await image.moveToDisk("../../public/avatar", {
        name: `${id}.${image.extname}`,
      });

      data = {
        avatar: `/avatar/${image.fileName}`,
      };

      await UserProvider.updateAvatar(id, data);
      return response.status(202);
    }

    data = {
      ...info,
    };

    await UserProvider.updateInfo(id, data);

    // return response.status(202);
  }
}
