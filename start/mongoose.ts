/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import mongoose from "mongoose";
mongoose.connect(
  "mongodb://test:test@192.168.0.71:27018/eshop?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  () => {
    return { useNewUrlParser: true, useUnifiedTopology: true };
  }
);
