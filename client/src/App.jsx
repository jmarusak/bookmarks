import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import TablePage from "./TablePage";
import FormPage from "./FormPage";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">List</Link> | <Link to="/insert">Insert</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TablePage />} />
        <Route path="/insert" element={<FormPage />} />
      </Routes>
    </Router>
  );
};

export default App;
