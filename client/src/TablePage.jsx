import { useState } from "react";

import Prompt from "./components/Prompt";
import Table from "./components/Table";

const TablePage = () => {

  const [rowData, setRowData] = useState([
    {
      link_id: "link-001",
      url: "https://www.example.com",
      title: "Example Website",
      description: "A website for examples and learning purposes.",
      created_on: "2023-04-01T10:00:00Z",
    },
    {
      link_id: "link-002",
      url: "https://www.anotherexample.com",
      title: "Another Example",
      description: "A site that provides additional examples and resources.",
      created_on: "2023-04-02T12:30:00Z",
    },
    {
      link_id: "link-003",
      url: "https://www.testsite.com",
      title: "Test Site",
      description: "A website dedicated to testing and demonstrations.",
      created_on: "2023-04-03T09:15:00Z",
    },
  ]);

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

export default TablePage;
