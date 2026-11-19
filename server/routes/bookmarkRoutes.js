const express = require('express');
const router = express.Router();
const {
  getBookmarks,
  createBookmark,
  toggleFavoriteBookmark,
  deleteBookmark,
} = require('../controllers/bookmarkController');

// /api/bookmarks par GET aur POST
router.route('/')
  .get(getBookmarks)
  .post(createBookmark);

// /api/bookmarks/:id/favorite par PATCH
router.patch('/:id/favorite', toggleFavoriteBookmark);

// /api/bookmarks/:id par DELETE
router.delete('/:id', deleteBookmark);

module.exports = router;