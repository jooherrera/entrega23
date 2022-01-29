/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

// Route.get("/dashboard", async ({ view }) => {
//   return view.render("welcome");
// }).middleware("auth");
Route.get("/", "HomeController.index").middleware("authSilent");
Route.get("/product/:id", "HomeController.showOneProduct").middleware(
  "authSilent"
);

Route.get("login", "AuthController.showLogin");
Route.post("login", "AuthController.login");
Route.post("logout", "AuthController.logout");

Route.get("/register", "AuthController.showRegister");
Route.post("/register", "AuthController.register");

Route.get("/cart", "UsersController.cart").middleware("auth");
Route.put("/user/:id", "UsersController.update").middleware("authSilent");
Route.get("/user/:id/edit", "UsersController.edit").middleware("authSilent");

Route.group(() => {
  Route.resource("product", "ProductsController");
})
  .prefix("api/v1")
  .middleware("authAdmin");
