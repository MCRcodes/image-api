const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    index: { sparse: true },
  },
  src: String,
  thumb: String,
  caption: {
    type: String,
    required: [true, 'Caption is required'],
  },
  tags: {
    type: [String],
    index: { sparse: true },
    default: [],
  },
  likedBy: {
    type: [String],
  },
  comments: [{
    content: {
      type: String,
      required: [true, 'Comment text is required'],
      minlength: [1, 'Comment text is required'],
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    timestamp: Number,
  }],
  timestamp: Number,
});

imageSchema.static('findByTags', function findByTags(tags) {
  return this.find({ tags: { $in: tags } });
});

imageSchema.virtual('likes').get(function likes() {
  return this.likedBy.length;
});

imageSchema.method('isLikedBy', function isLikedBy(user) {
  return this.likedBy.includes(user);
});

imageSchema.method('like', function like(user) {
  this.likedBy.addToSet(user);
  return this;
});

imageSchema.method('unlike', function unlike(user) {
  this.likedBy.pull(user);
  return this;
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
