// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "../../Models/User";

export default class AuthController {
  public async showLogin({ view }) {
    return view.render("login");
  }

  public async login({ request, response, auth }) {
    await auth.attempt(request.input("uid"), request.input("password"), true);
    response.redirect("/");
  }

  public async logout({ response, auth }) {
    await auth.logout();
    response.redirect("/login");
  }

  public async create() {
    const newUser = new User({
      email: "joo",
      password: "joo",
    });

    await newUser.save();
    const Users = await User.find();

    // Close the connection

    // Return all the cats (including the new one)
    return Users;
  }
}
