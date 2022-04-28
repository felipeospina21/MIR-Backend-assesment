// require("dotenv").config();

const mongoose = require("mongoose");

let connection;
async function connectDB() {
  if (connection) return;
  let uri;
  if (process.env.NODE_ENV === "test") {
    uri = process.env.MONGODB_TEST_URI;
  } else {
    uri = process.env.MONGODB_URI;
  }

  connection = mongoose.connection;

  connection.once("open", () => console.log("Connection established successfully"));
  connection.on("disconnected", () => console.log("Successfully disconnected"));
  connection.on("error", (err) => console.log("Something went wrong!", err));

  await mongoose.connect(uri);
  // try {
  // } catch (error) {
  //   process.exit(1);
  // }
}

async function disconnect() {
  if (!connection) return;

  await mongoose.disconnect();
}

async function cleanup() {
  if (connection) {
    const promises = [];

    for (const collection in connection.collections) {
      promises.push(connection.collections[collection].deleteMany({}));
    }

    return await Promise.all(promises);
  }
}

module.exports = {
  connectDB,
  disconnect,
  cleanup,
};
