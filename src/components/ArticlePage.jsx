import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../service/api';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleData = await api.getArticleById(id);
        setArticle(articleData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Logo */}
      <div className="text-center py-6">
        <h1 className="text-5xl nyt">The AIT Gazette</h1>
      </div>
        <article className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
            <div className="text-sm text-gray-500 mb-2">
            {new Date(article.lastModified).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}
            </div>
            <h1 className="font-serif text-4xl font-bold leading-tight mb-4">
            {article.title}
            </h1>
            <div className="text-gray-500 text-lg">
            By <span className="font-semibold">{article.author}</span>
            </div>
        </header>

        <div className="mb-8">
            <img 
            src={`https://drive.google.com/thumbnail?id=${article.imageUrl}&sz=w1000`}
            alt="Article hero"
            className="w-full h-96 object-cover rounded-lg"
            />
        </div>

        <div className="article-content">
            <div className="font-serif text-lg leading-relaxed space-y-6">
            {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
                Published: {new Date(article.publishedDate).toLocaleDateString()}
            </div>
            <div className="flex space-x-4">
                {/* Share buttons would go here */}
                <button className="text-gray-500 hover:text-gray-700">
                Share
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                Save
                </button>
            </div>
            </div>
        </footer>
        </article>
    </div>
  );
};

export default ArticlePage;