import Post from "../model/posts.js";

export const addPost = async (req, res) => {
  req.body.user = req.userId;
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json({ msg: "new post added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ errors: [{ msg: "Failed to add new post" }] });
  }
};

export const getposts = async (req, res) => {
  try {
    if (req.userId !== req.params.id) {
      return res.status(401).json({ errors: [{ msg: "Not Authenticated" }] });
    }
    const posts = await Post.find({ user: req.userId }).populate(
      "user"
      //   "username"
    );
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ errors: [{ msg: "Failed to get posts" }] });
  }
};
