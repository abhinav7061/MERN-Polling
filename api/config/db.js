const mongoose = require("mongoose");

exports.connectDatabase = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `mongodb connected to ${mongoose.connection.host} successfully`
    );
  } catch (error) {
    console.log(`Error while connecting mongodb ${error.message}`);
  }
};
