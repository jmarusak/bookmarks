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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      created_on: new Date().toISOString(), // Auto-generate timestamp
    };

    console.log("Formed:", newEntry); // Replace this with API call or state update
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
