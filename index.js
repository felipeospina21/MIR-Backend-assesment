require("dotenv").config();
const { connectDB } = require("./config/database");
const app = require("./app");
const port = process.env.PORT || 8080;

connectDB();

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
