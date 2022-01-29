/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Env from "@ioc:Adonis/Core/Env";
import mongoose from "mongoose";

let URL = "";

if (Env.get("NODE_ENV") === "development") {
  URL = Env.get("MONGO_URI_DEV");
} else {
  URL = Env.get("MONGO_URI");
}

mongoose.connect(URL, () => {
  return { useNewUrlParser: true, useUnifiedTopology: true };
});
