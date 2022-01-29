import User from "App/Models/User";
/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class UserProvider {
  public static async updateAvatar(id, data) {
    return await User.findByIdAndUpdate(id, data);
  }

  public static async updateInfo(id, data) {
    let info = new Set();
    Object.keys(data).forEach((key) => {
      info[`info.${key}`] = data[key];
    });

    await User.findByIdAndUpdate(id, info);

    const resp = await User.findById(id, "info");

    Object.keys(resp?.info!).forEach((key) => {
      if (resp?.info![key] === "") {
        delete resp?.info![key];
      }
    });

    if (Object.entries(resp?.info!).length === 4) {
      await User.findByIdAndUpdate(id, { isComplete: true });
    } else {
      console.log("Falta");
    }

    return;
  }

  public static async getInfo(id) {
    return await User.findById(id);
  }
}
