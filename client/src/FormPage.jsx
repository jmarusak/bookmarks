import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "./FormPage.css"; // Import external CSS file

const FormPage = () => {
  const [formData, setFormData] = useState({
    link_id: "",
    url: "",
    title: "",
    description: "",
  });
  //const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      created_on: new Date().toISOString(), // Auto-generate timestamp
    };

    console.log(newEntry);

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
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
    //navigate("/");
  };

  return (
    <div className="insert-page">
      <h1>New Bookmark</h1>
      <form onSubmit={handleSubmit} className="insert-form">
        <label>URL:</label>
        <input type="url" name="url" value={formData.url} onChange={handleChange} required />

        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default FormPage;
