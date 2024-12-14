import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>オーライLINE</h1>
      <div className="menu">
        <Link to="/upload" className="menu-link">
          処方箋をアップロード
        </Link>
        <Link to="/select-delivery" className="menu-link">
          来店・配送の予約
        </Link>
        <Link to="/form/section/1" className="menu-link">
          問診票
        </Link>
      </div>
    </div>
  );
}

export default Home;
