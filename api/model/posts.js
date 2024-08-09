import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title must be required"],
  },
  price: {
    type: Number,
    required: [true, "price must be required"],
  },
  address: {
    type: String,
    required: [true, "address must be required"],
  },
  city: {
    type: String,
    required: [true, "city must be required"],
  },
  bedroom: {
    type: Number,
    required: [true, "bedroom number must be required"],
  },
  bathroom: {
    type: Number,
    required: [true, "bathroom number must be required"],
  },
  latitude: {
    type: String,
    required: [true, "latitude must be required"],
  },
  longitude: {
    type: String,
    required: [true, "longitude must be required"],
  },
  type: {
    type: String,
    enum: ["buy", "rent"],
    required: [true, "post type buy or rent must be required"],
  },
  property: {
    type: String,
    enum: ["apartment", "house", "condo", "land"],
    required: [true, "property must be required"],
  },
  imageUrl: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "user must be required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
