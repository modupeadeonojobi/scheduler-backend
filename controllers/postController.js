const Post = require('../models/post');

// @desc    Get all posts
// @route   GET /api/posts
async function getPosts(req, res) {
  try {
    const post = await Post.find();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(post));
    
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getPosts
}