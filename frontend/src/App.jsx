import React from "react";
import Login from "./pages/login";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import './App.css'

export default function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user/:userEmail" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}  