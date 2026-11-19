const Bookmark = require('../models/Bookmark');

// @desc    Fetch all bookmarks (supports ?category= and ?search=, sorted newest first)
// @route   GET /api/bookmarks
const getBookmarks = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // 1. Category Filter: agar category aayi hai aur 'All' ya 'Favorites' nahi hai
    if (category && category !== 'All' && category !== 'Favorites') {
      query.category = category;
    }

    // 2. Favorites Filter: agar user ne Favorites filter chuna ho
    if (category === 'Favorites') {
      query.isFavorite = true;
    }

    // 3. Search Filter: Title par case-insensitive regex search
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Newest first ke liye createdAt: -1 (Descending order)
    const bookmarks = await Bookmark.find(query).sort({ createdAt: -1 });
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching bookmarks', error: error.message });
  }
};

// @desc    Create a new bookmark
// @route   POST /api/bookmarks
const createBookmark = async (req, res) => {
  try {
    const { title, url, category } = req.body;

    // Validation 1: Title aur URL empty nahi hone chahiye
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!url || !url.trim()) {
      return res.status(400).json({ message: 'URL is required' });
    }

    // Validation 2: URL format check (HTTP ya HTTPS)
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(url.trim())) {
      return res.status(400).json({ message: 'URL must start with http:// or https://' });
    }

    // Database me naya bookmark save karo
    const newBookmark = await Bookmark.create({
      title: title.trim(),
      url: url.trim(),
      category: category || 'Work',
    });

    res.status(201).json(newBookmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Toggle isFavorite status
// @route   PATCH /api/bookmarks/:id/favorite
const toggleFavoriteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const bookmark = await Bookmark.findById(id);

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    // Toggle: agar true tha toh false, false tha toh true
    bookmark.isFavorite = !bookmark.isFavorite;
    await bookmark.save();

    res.status(200).json(bookmark);
  } catch (error) {
    res.status(404).json({ message: 'Invalid ID or Bookmark not found' });
  }
};

// @desc    Delete a bookmark by ID
// @route   DELETE /api/bookmarks/:id
const deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const bookmark = await Bookmark.findByIdAndDelete(id);

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    res.status(200).json({ message: 'Bookmark deleted successfully', id });
  } catch (error) {
    res.status(404).json({ message: 'Invalid ID or Bookmark not found' });
  }
};

module.exports = {
  getBookmarks,
  createBookmark,
  toggleFavoriteBookmark,
  deleteBookmark,
};