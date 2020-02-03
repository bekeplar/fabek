import { Schema, model } from "mongoose";

const productSchema = Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true }
//   creator: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

export default model("Product", productSchema);
