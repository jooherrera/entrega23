// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";

export default class AuthController {
  public async showLogin({ view }) {
    return view.render("login", {
      btn: "ok",
    });
  }

  public async login({ request, response, auth, session }) {
    await auth.attempt(
      request.input("username"),
      request.input("password"),
      true
    );
    session.put;
    response.redirect("/");
  }

  public async logout({ response, auth }) {
    await auth.logout();
    response.redirect("/");
  }

  public async showRegister({ view }) {
    return view.render("register");
  }

  public async register({ request, response, session }) {
    const { username, password, email } = request.body();

    if (!username || !password || !email) {
      session.flash({ error: "Faltan Datos" });
      return response.redirect().back();
    }

    const emailExist = await User.exists({ email: email });
    const userExist = await User.exists({ username: username });

    if (emailExist || userExist) {
      session.flash({ error: "Usuario o Mail ya existen. " });
      return response.redirect().back();
    } else {
      const newUser = new User({ username, password, email });
      await newUser.save();
      session.flash({ msg: "Usuario creado" });
      return response.redirect().back();
      // return view.render("created");
    }
  }
}
