import express from "express";
import Dish from "./models/Dish.js";

const router = express.Router();

// GET / - Fetch all dishes
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /:id/toggle - Toggle isPublished
router.patch("/:id/toggle", async (req, res) => {
  try {
        const dish = await Dish.findOne({ dishId: req.params.id });

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    dish.isPublished = !dish.isPublished;
    await dish.save();

    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;