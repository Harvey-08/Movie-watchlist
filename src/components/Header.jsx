import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="site-header">
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">WatchList</Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/" className="pill-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/watchlist" className="pill-link">
                Watch List
              </Link>
            </li>
            <li>
              <Link to="/watched" className="pill-link">
                Watched
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
