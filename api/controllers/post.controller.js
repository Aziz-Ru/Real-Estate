import Post from "../model/posts.js";
import User from "../model/user.js";

export const addPost = async (req, res) => {
  const inputParams = req.body;
  try {
    const newPost = await Post.create({ ...inputParams, user: req.userId });
    await User.updateOne(
      { _id: req.userId },
      { $push: { posts: newPost._id } }
    );

    res.status(200).json({ msg: "new post added successfully" });
  } catch (error) {
    // console.log(error.message);
    res.status(400).json({ errors: [{ msg: "Failed to add new post" }] });
  }
};

export const getposts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId });

    return res.status(200).json(posts);
  } catch (error) {
    // console.log(error.message);
    res.status(400).json({ errors: [{ msg: "Failed to get posts" }] });
  }
};

export const getpost = async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.postId });
    return res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "Failed to get posts" }] });
  }
};

export const updatepost = (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "Failed to get posts" }] });
  }
};

export const deletepost = async (req, res) => {
  console.log(req.params.postId);
  try {
    const post = await Post.findById({ _id: req.params.postId });
    
    if (post.user.toString() !== req.userId) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Failed to delete posts" }] });
    }
    await Post.deleteOne({ _id: req.params.postId });
    const user = await User.findById(req.userId);
    user.posts.pop(req.params.id);
    user.save();
    return res.status(200).json({ msg: "Delete Successful" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ errors: [{ msg: "Failed to delete post" }] });
  }
};
