import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>薬局サービスへようこそ</h1>
      <div className="menu">
        <Link to="/upload" className="menu-link">
          処方箋をアップ
        </Link>
        <Link to="/appointments" className="menu-link">
          予約一覧を見る
        </Link>
        <Link to="/notifications" className="menu-link">
          通知を見る
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
