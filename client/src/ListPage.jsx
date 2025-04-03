import { useState, useEffect } from "react";

import Prompt from "./components/Prompt";
import Table from "./components/Table";

const ListPage = () => {

  const [rowData, setRowData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/links');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRowData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (prompt) => {
    console.log("Prompt submitted:", prompt);
  };

  return (
    <div className="app-container">
      <h1>Bookmarks</h1>
      <div>
        <Prompt onSubmit={handleSubmit} />
      </div>
      <div>
        <Table links={rowData} />
      </div>
    </div>
  );
};

export default ListPage;
