import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field

// create PostModel class from schema
const PostSchema = new Schema({
  title: String,
  coverUrl: String,
  tags: String,
  content: String,
  datePosted: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
