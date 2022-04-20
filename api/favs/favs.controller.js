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

async function getAllFavsLists(req, res) {
  try {
    const favsLists = await FavsList.find();
    res.status(200).json(favsLists);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getFavsListById(req, res) {
  const { id } = req.params;

  try {
    const favsList = await FavsList.findById(id);
    res.status(200).json(favsList);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function deleteFavsList(req, res) {
  const { id } = req.params;
  try {
    const favsList = await FavsList.findByIdAndDelete(id);
    res.status(200).json(favsList);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  createFavsList,
  getAllFavsLists,
  getFavsListById,
  deleteFavsList,
};
