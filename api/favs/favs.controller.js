const FavsList = require("./favs.model");

async function createFavsList(req, res) {
  const payload = req.body;
  try {
    const newFavsList = await FavsList.create(payload);
    res.status(200).json(newFavsList);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  createFavsList,
};
