import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={LandingPage()}></Route>
          <Route path="/home" element={Home()}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
