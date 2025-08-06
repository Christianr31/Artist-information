import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./src/index.css";
import Home from "./src/components/Home.jsx";
import ArtistDetail from "./src/components/ArtistDetail.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist/:id" element={<ArtistDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
