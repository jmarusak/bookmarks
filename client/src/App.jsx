import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ListPage from "./ListPage";
import InsertPage from "./InsertPage";
import DeletePage from "./DeletePage";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">List</Link> | <Link to="/insert">Insert</Link> | <Link to="/delete">Delete</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/insert" element={<InsertPage />} />
        <Route path="/delete" element={<DeletePage />} />
      </Routes>
    </Router>
  );
};

export default App;
