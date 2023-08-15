const { mongoose } = require('mongoose');
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
      required: true,
    },
    authorOccupation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const blogModel = mongoose.model('blogs', blogSchema);
module.exports = blogModel;
