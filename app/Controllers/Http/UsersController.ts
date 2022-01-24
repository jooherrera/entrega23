import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async index({}: HttpContextContract) {
    // Create cat model

    const user = new User({
      username: "jose",
      password: "123",
      email: "saddas.com",
    });

    // Save cat to DB

    await user.save();

    // Return list of all saved cats
    const users = await User.find();

    // Close the connection

    // Return all the cats (including the new one)
    return users;
  }
}
