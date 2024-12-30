import React from 'react';

const ArticleTable = ({ articles, onDelete, onEdit }) => {
  return (
    <table className="table-auto w-full bg-white shadow-md rounded">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Category</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => (
          <tr key={article._id}>
            <td className="border px-4 py-2">{article.title}</td>
            <td className="border px-4 py-2">{article.category}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onEdit(article)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(article._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArticleTable;
