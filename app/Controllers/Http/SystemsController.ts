// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SystemsController {
  public async showError({ view }) {
    return view.render("error");
  }
}
