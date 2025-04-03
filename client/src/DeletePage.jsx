import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeletePage.css";

const DeletePage = () => {
  const [formData, setFormData] = useState({
    link_id: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({[name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const link_id = formData["link_id"];

    try {
      const api_url = "http://localhost:8000/api/links/" + link_id;
      const response = await fetch(api_url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
    navigate("/");
  };

  return (
    <div className="delete-page">
      <h1>Delete Bookmark</h1>
      <form onSubmit={handleSubmit} className="delete-form">
        <label>Link ID/Created On:</label>
        <input type="text" name="link_id" value={formData.link_id} onChange={handleChange} required />

        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default DeletePage;
