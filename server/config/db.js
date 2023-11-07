const mongoose = require("mongoose");
const mongodb = async () => {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }); //replace by MONGO_URL
  console.log("database connected successfully");
};

mongodb().catch((err) => console.log(err));

module.exports = mongoose;
