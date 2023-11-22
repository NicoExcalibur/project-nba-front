import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";
import Team from "./components/Team/Team";
import Error404 from "./components/Error404/Error404";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="team/:id" element={<Team />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
