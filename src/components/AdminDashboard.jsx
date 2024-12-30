import React, { useState, useEffect } from 'react';
import { api } from '../service/api';
import ArticleForm from '../components/ArticleForm';
import ArticleTable from '../components/ArticleTable';

const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await api.getArticles();
      setArticles(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.deleteArticle(id);
      fetchArticles(); // Refresh the list
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
  };

  const handleFormSubmit = () => {
    setSelectedArticle(null); // Clear the selected article after adding/updating
    fetchArticles(); // Refresh the list
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear authentication status
    window.location.href = '/AdminLogin'; // Redirect to login page
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Article Form */}
        <ArticleForm
          selectedArticle={selectedArticle}
          onSubmit={handleFormSubmit}
        />

        {/* Articles Table */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ArticleTable
            articles={articles}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
