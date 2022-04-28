const mongoose = require("mongoose");

const FavsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      lowercase: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FavsListSchema = new mongoose.Schema(
  {
    name: String,
    favs: [FavsSchema]
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('FavsList', FavsListSchema)