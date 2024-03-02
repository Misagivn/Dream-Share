import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Product name"],
  },
  descripton: {
    type: String,
    require: [true, "Product description"],
  },
  price: {
    type: Number,
    require: [true, "Product price"],
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  category: {
    type: String,
    require: [true, "Product category"],
    enum: {
      values: ["desk", "table", "chair"],
      message: "Select Category",
    },
  },
  cratedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
