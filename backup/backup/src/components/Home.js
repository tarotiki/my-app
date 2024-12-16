import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h3>LINEdeオーライ</h3>
      <p className="description">
        オンラインだから待たずに受取れる
      </p>

      <div className="steps">
        <h2>ご利用の流れ</h2>
        <ol>
          <li><strong>1 処方箋アップロード</strong>処方箋を撮影し送信します。</li>
          
          {/* 処方箋を送信メニューは、ここに挿入 */}
          <li>
            <Link to="/upload" className="menu-link">
              <strong>処方箋を送信</strong>
            </Link>
          </li>
          
          <li><strong>2 薬局からの通知</strong>お薬の準備が整うと、当局からLINEメッセージでお知らせします。</li>
          <li><strong>3 受け取り方法の選択</strong>受け取ったメッセージ内のリンクから来店または宅配の予約がきます。</li>
        </ol>

        <ol>
        <span className="highlight"> = 初めての方 = </span>
          <li><strong>問診票入力</strong>初回ご利用時には問診票の入力が必要です。</li>
        </ol>

        <li>
          <Link to="/form/section/1" className="menu-link">
            <strong>問診票を記入</strong>
          </Link>
        </li>

        <div className="extra-link">
          詳しいご利用方法は<Link to="https://llc-allright.com/pharmacy/%e3%82%aa%e3%83%b3%e3%83%a9%e3%82%a4%e3%83%b3%ef%bd%9e%e3%81%8a%e8%96%ac%e9%85%8d%e9%80%81%e3%81%be%e3%81%a7%e3%81%ae%e6%b5%81%e3%82%8c/">こちら</Link>からご覧いただけます。
        </div>
      </div>
    </div>
  );
}

export default Home;
