import React from "react";
import HomePage from "./pages/home";
import { Routes, Route } from "react-router";
import Service from "./pages/service";
import NotFounPage from "./pages/notfoundpage";
import Navbar from "./components/fragments/navbar/Navbar";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<Service />} /> 
        <Route path="*" element={<NotFounPage />} />
      </Routes>
    </>
  );
}

export default App;
