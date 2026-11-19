const mongoose = require('mongoose');

// URL format check karne ke liye Regex (HTTP ya HTTPS se shuru hona chahiye)
const urlRegex = /^https?:\/\/.+/;

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true,
    match: [urlRegex, 'Please enter a valid HTTP or HTTPS URL'],
  },
  category: {
    type: String,
    enum: ['Work', 'Learning', 'Tools', 'Entertainment'],
    default: 'Work',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);