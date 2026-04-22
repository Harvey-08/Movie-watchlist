import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Watchlist from "./components/Watchlist";
import Watched from "./components/Watched";
import Home from "./components/Home";
import "./App.css";
import "./lib/font-awesome/css/all.min.css";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />

        <Routes>
          {/* Landing page: Discover / Home */}
          <Route path="/" element={<Home />} />

          {/* Watchlist page */}
          <Route path="/watchlist" element={<Watchlist />} />

          <Route path="/watched" element={<Watched />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
