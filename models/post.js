const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String },
  body: { type: String },
  category: { type: String },
  likes: { type: Number },
  tags: { type: Array },
  user: { type: Object },
  date: { type: Date }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;

