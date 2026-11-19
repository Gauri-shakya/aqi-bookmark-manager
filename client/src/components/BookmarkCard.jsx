import React from 'react';
import { ExternalLink, Star, Trash2 } from 'lucide-react';

const BookmarkCard = ({ bookmark, onToggleFavorite, onDelete }) => {
  const getBadgeStyle = (cat) => {
    switch (cat) {
      case 'Work': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Learning': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Tools': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Entertainment': return 'bg-pink-50 text-pink-700 border-pink-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className={`bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md ${
      bookmark.isFavorite ? 'border-l-4 border-l-amber-400 border-slate-200' : 'border-slate-200'
    }`}>
      <div>
        {/* Header: Category Badge & Actions */}
        <div className="flex justify-between items-center mb-3">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getBadgeStyle(bookmark.category)}`}>
            {bookmark.category}
          </span>
          <div className="flex items-center gap-1">
            {/* Favorite Toggle Button */}
            <button
              onClick={() => onToggleFavorite(bookmark._id)}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer transition"
              title={bookmark.isFavorite ? 'Remove favorite' : 'Mark favorite'}
            >
              <Star
                size={18}
                fill={bookmark.isFavorite ? '#f59e0b' : 'none'}
                className={bookmark.isFavorite ? 'text-amber-500' : 'text-slate-400'}
              />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(bookmark._id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer transition"
              title="Delete bookmark"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug line-clamp-2">
          {bookmark.title}
        </h4>

        {/* URL Link */}
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 break-all mb-4 group"
        >
          <span className="group-hover:underline">{bookmark.url}</span>
          <ExternalLink size={13} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Footer Date */}
      <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
        <span>
          {new Date(bookmark.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
};

export default BookmarkCard;