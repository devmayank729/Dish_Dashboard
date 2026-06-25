import mongoose from "mongoose";


const dishSchema = new mongoose.Schema({
  dishId: {
    type: Number,
    required: true,
    unique: true,
  },
  dishName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});



const Dish = mongoose.model("Dish", dishSchema);


export default Dish;