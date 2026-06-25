import mongoose from "mongoose";

// Define the schema
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


// Create the model
const Dish = mongoose.model("Dish", dishSchema);

// Export it using ES Modules(ES6)
export default Dish;