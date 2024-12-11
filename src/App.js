import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import liff from "@line/liff";
import "./styles.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: "2006630915-yWlPqLrB" }); // Replace with your actual LIFF ID
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          const profile = await liff.getProfile();
          setUserProfile(profile);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("LIFF initialization failed:", error);
      }
    };

    initializeLiff();
  }, []);

  const handleLogout = () => {
    liff.logout();
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  if (!isLoggedIn) {
    return <p className="loading">ログインしています...</p>;
  }

  return (
    <div className="app">
      <AppRoutes userProfile={userProfile} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
