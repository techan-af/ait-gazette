import React, { useState, useEffect } from 'react';
import { api } from '../service/api';

const ArticleForm = ({ selectedArticle, onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    content: '',
    category: '',
    readTime: '',
    imageUrl: '',
    author: '',
    tags: '',
    featured: false,
  });

  useEffect(() => {
    if (selectedArticle) {
      setForm({
        ...selectedArticle,
        tags: selectedArticle.tags?.join(', '), // Convert tags array to a comma-separated string
      });
    } else {
      setForm({
        title: '',
        subtitle: '',
        content: '',
        category: '',
        readTime: '',
        imageUrl: '',
        author: '',
        tags: '',
      });
    }
  }, [selectedArticle]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map((tag) => tag.trim()), // Convert tags string to an array
    };

    try {
      if (selectedArticle) {
        await api.updateArticle(selectedArticle._id, payload); // Update article
      } else {
        await api.createArticle(payload); // Create new article
      }
      onSubmit(); // Trigger refresh
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">
        {selectedArticle ? 'Edit Article' : 'Add New Article'}
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Subtitle */}
      <div className="mb-4">
        <label className="block text-gray-700">Subtitle</label>
        <input
          type="text"
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Content */}
      <div className="mb-4">
        <label className="block text-gray-700">Content</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="5"
          required
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Read Time */}
      <div className="mb-4">
        <label className="block text-gray-700">Read Time (in minutes)</label>
        <input
          type="number"
          name="readTime"
          value={form.readTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Image URL */}
      <div className="mb-4">
        <label className="block text-gray-700">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Author */}
      <div className="mb-4">
        <label className="block text-gray-700">Author</label>
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label className="block text-gray-700">Tags (comma-separated)</label>
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Featured</label>
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
          className="mr-2"
        />
        <span>Mark as Featured</span>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {selectedArticle ? 'Update' : 'Add'} Article
      </button>
    </form>
  );
};

export default ArticleForm;
