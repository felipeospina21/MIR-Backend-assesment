const { Router } = require("express");
const {
  createFavsList,
  getAllFavsLists,
  getFavsListById,
  deleteFavsList,
} = require("./favs.controller");

const router = Router();

router.post("/", createFavsList);
router.get("/", getAllFavsLists);
router.get("/:id", getFavsListById);
router.delete("/:id", deleteFavsList);

module.exports = router;
