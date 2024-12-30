// src/services/api.js
const API_BASE_URL = 'https://aitgaz.onrender.com/api';

export const api = {


  // Articles
  async getArticles(params = {}) {
    const queryString = new URLSearchParams(params).toString(); // Converts the params object into a query string
    const response = await fetch(`${API_BASE_URL}/articles?${queryString}`);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return response.json();
  },

  async getArticleById(id) {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`); // Use the article's id
    if (!response.ok) throw new Error('Failed to fetch article');
    return response.json();
  },

  async getArticleBySlug(slug) {
    const response = await fetch(`${API_BASE_URL}/articles/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch article');
    return response.json();
  },

  async createArticle(article) {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    });
    if (!response.ok) throw new Error('Failed to create article');
    return response.json();
  },

  async updateArticle(id, article) {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    });
    if (!response.ok) throw new Error('Failed to update article');
    return response.json();
  },

  async deleteArticle(id) {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete article');
    return response.json();
  },

  // Categories and Tags
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async getTags() {
    const response = await fetch(`${API_BASE_URL}/tags`);
    if (!response.ok) throw new Error('Failed to fetch tags');
    return response.json();
  }


};