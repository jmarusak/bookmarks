import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InsertPage.css";

const InsertPage = () => {
  const [formData, setFormData] = useState({
    url: "",
    image: "",
    title: "",
    category: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date().toISOString();
    const newEntry = {
      link_id: now,
      ...formData,
      created_on: now,
    };

    try {
      const response = await fetch('http://localhost:8000/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(newEntry)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('link_id:', data);
    } catch (error) {
      console.error('Error:', error);
    }
    navigate("/");
  };

  return (
    <div className="insert-page">
      <h1>New Bookmark</h1>
      <form onSubmit={handleSubmit} className="insert-form">
        <label>URL:</label>
        <input type="url" name="url" value={formData.url} onChange={handleChange} required />

        <label>Image:</label>
        <input type="url" name="image" value={formData.image} onChange={handleChange} required />

        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Category:</label>

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          <option value="blog">blog</option>
          <option value="book">book</option>
          <option value="course">course</option>
          <option value="doc">doc</option>
          <option value="github">github</option>
          <option value="medium">medium</option>
          <option value="news">news</option>
          <option value="paper">paper</option>
          <option value="recipe">recipe</option>
        </select>

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default InsertPage;
