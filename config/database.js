const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log(
        "Database is Connected Successfully"
      );
    })
    .catch((err) => {
      console.log(
        "Database is not Connected. "
      );
      console.log(err.message);
      process.exit(1);
    });
};

module.exports = dbConnect;                                                                                                   
