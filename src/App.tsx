import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Employee from "./Components/Employee/Employee";
import Banner from "./Components/Banner/Banner";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/check-employee" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
