import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const BookmarkForm = ({ onAddBookmark }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Work');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!/^https?:\/\/.+/i.test(url.trim())) {
      newErrors.url = 'URL must start with http:// or https://';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const success = await onAddBookmark({ title, url, category });
    setIsSubmitting(false);

    if (success) {
      setTitle('');
      setUrl('');
      setCategory('Work');
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8 transition-all hover:shadow-md">
      <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-4">
        <PlusCircle size={20} className="text-indigo-600" /> Add New Bookmark
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        {/* Title Input */}
        <div className="md:col-span-4 flex flex-col gap-1.5">
          <label htmlFor="title" className="text-xs font-semibold text-slate-600">Bookmark Title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g., React Documentation"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: '' });
            }}
            className={`px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition ${
              errors.title
                ? 'border-red-400 bg-red-50 focus:ring-red-200'
                : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100'
            }`}
          />
          {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
        </div>

        {/* URL Input */}
        <div className="md:col-span-5 flex flex-col gap-1.5">
          <label htmlFor="url" className="text-xs font-semibold text-slate-600">Website URL</label>
          <input
            id="url"
            type="text"
            placeholder="https://react.dev"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (errors.url) setErrors({ ...errors, url: '' });
            }}
            className={`px-3.5 py-2.5 rounded-lg border text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 transition ${
              errors.url
                ? 'border-red-400 bg-red-50 focus:ring-red-200'
                : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100'
            }`}
          />
          {errors.url && <span className="text-xs text-red-500">{errors.url}</span>}
        </div>

        {/* Category Selector */}
        <div className="md:col-span-3 flex flex-col gap-1.5">
          <label htmlFor="category" className="text-xs font-semibold text-slate-600">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition cursor-pointer"
          >
            <option value="Work">Work</option>
            <option value="Learning">Learning</option>
            <option value="Tools">Tools</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition disabled:opacity-50 cursor-pointer shadow-sm hover:shadow"
      >
        {isSubmitting ? 'Adding...' : 'Save Bookmark'}
      </button>
    </form>
  );
};

export default BookmarkForm;