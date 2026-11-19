import React from 'react';
import { Search, Star } from 'lucide-react';

const CATEGORIES = ['All', 'Favorites', 'Work', 'Learning', 'Tools', 'Entertainment'];

const FilterBar = ({ selectedCategory, onSelectCategory, searchQuery, onSearchChange }) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Search Input */}
      <div className="relative flex items-center">
        <Search size={18} className="absolute left-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search bookmarks by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-sm shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
          >
            ×
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {cat === 'Favorites' && (
                <Star size={13} fill={isActive ? '#ffffff' : '#f59e0b'} className={isActive ? 'text-white' : 'text-amber-500'} />
              )}
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;