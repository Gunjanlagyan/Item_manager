import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItem from "./pages/AddItem";
import ViewItems from "./pages/ViewItems";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <ToastContainer position="top-center" autoClose={2000} />
        <Routes>
          <Route path="/" element={<AddItem />} />
          <Route path="/view-items" element={<ViewItems />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
