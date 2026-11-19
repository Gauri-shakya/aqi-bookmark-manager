import React, { useState, useEffect, useCallback } from 'react';
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import BookmarkForm from './components/BookmarkForm';
import FilterBar from './components/FilterBar';
import BookmarkCard from './components/BookmarkCard';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fetch Bookmarks
  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'All') {
        params.append('category', selectedCategory);
      }
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      const res = await fetch(`${API_BASE}/bookmarks?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch bookmarks');
      const data = await res.json();
      setBookmarks(data);
    } catch (err) {
      console.error(err);
      setError('Could not connect to server. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBookmarks();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchBookmarks]);

  // 2. Add Bookmark (POST)
  const handleAddBookmark = async (newBookmarkData) => {
    try {
      const res = await fetch(`${API_BASE}/bookmarks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBookmarkData),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Error saving bookmark');
        return false;
      }

      setBookmarks((prev) => [data, ...prev]);
      return true;
    } catch (err) {
      alert('Network error while adding bookmark');
      return false;
    }
  };

  // 3. Toggle Favorite (PATCH)
  const handleToggleFavorite = async (id) => {
    setBookmarks((prev) =>
      prev.map((b) => (b._id === id ? { ...b, isFavorite: !b.isFavorite } : b))
    );

    try {
      const res = await fetch(`${API_BASE}/bookmarks/${id}/favorite`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to update favorite');
    } catch (err) {
      console.error(err);
      fetchBookmarks();
    }
  };

  // 4. Delete Bookmark (DELETE)
  const handleDeleteBookmark = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bookmark?')) return;

    setBookmarks((prev) => prev.filter((b) => b._id !== id));

    try {
      const res = await fetch(`${API_BASE}/bookmarks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete bookmark');
    } catch (err) {
      console.error(err);
      alert('Failed to delete bookmark from server');
      fetchBookmarks();
    }
  };

  const totalCount = bookmarks.length;
  const favCount = bookmarks.filter((b) => b.isFavorite).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14 min-h-screen flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3.5">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 text-white p-3 rounded-2xl shadow-md shadow-indigo-100">
              <Bookmark size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bookmark & Link Manager</h1>
              <p className="text-xs text-slate-500">AQI Labs Evaluation • Organize your web resources cleanly</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-2">
              <span className="text-base font-bold text-indigo-600">{totalCount}</span>
              <span className="text-xs text-slate-500">Total</span>
            </div>
            <div className="bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-2">
              <span className="text-base font-bold text-amber-500">{favCount}</span>
              <span className="text-xs text-slate-500">Favorites</span>
            </div>
          </div>
        </header>

        {/* Bookmark Form */}
        <BookmarkForm onAddBookmark={handleAddBookmark} />

        {/* Filter and Search Bar */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* UI States */}
        {loading ? (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl">
            <Loader2 size={36} className="animate-spin text-indigo-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500 font-medium">Loading bookmarks...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex justify-between items-center mb-6">
            <p className="text-sm font-medium">{error}</p>
            <button
              onClick={fetchBookmarks}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition"
            >
              Retry
            </button>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl px-4">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <BookmarkCheck size={32} />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">No bookmarks found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery || selectedCategory !== 'All'
                ? `No results match your filter "${selectedCategory}" or search query.`
                : "You haven't added any bookmarks yet. Use the form above to add your first link!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDeleteBookmark}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center pt-12 pb-4 text-xs text-slate-400">
        Built with MongoDB, Express, React, and Node.js • AQI Labs Intern Assignment
      </footer>
    </div>
  );
}

export default App;
