import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async showRegister({ view }) {
    return view.render("register");
  }

  public async register({ request, view }: HttpContextContract) {
    const { username, password, email } = request.body();

    if (!username || !password || !email) {
      return view.render("error", {
        error: "Faltan datos",
      });
    }

    const emailExist = await User.exists({ email: email });
    const userExist = await User.exists({ username: username });

    if (emailExist || userExist) {
      return view.render("error", {
        emailExist,
        userExist,
      });
    } else {
      const newUser = new User({ username, password, email });
      await newUser.save();
      return view.render("created");
    }
  }
}
