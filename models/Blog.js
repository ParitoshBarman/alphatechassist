const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  mainDescription: String,
  subTitle: String,
  subDescription: String,
  quotes: String,
  quotesAuthor: String,
  videoThumbnail: String,
  videoTitle: String,
  videoDescription: String,
  videoHighlightPoints: String,
  videoYouTubeLink: String,
  quotationParagraph: String,
  lastParagraph: String,
  tags: [String],
  blogAuthor: String,
  createdDateTime: { type: Date, default: Date.now },
  modifiedDateTime: Date,
  comments: [{ email: String, name: String, message: String }],
  category: String,
  slug: { type: String, unique: true },
});

module.exports = mongoose.model('Blog', blogSchema);
