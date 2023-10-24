import axios from "axios";
import "./App.css";
import Dashboard from "./Components/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
// import CreateForm from "./Components/createForm/CreateForm";
// import EditForm from "./Components/updateComponent/EditForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        {/* <Route path="/create" element={<CreateForm />} />
        <Route path="/update" element={<EditForm />} /> */}
      </Routes>
    </div>
  );
}

export default App;
