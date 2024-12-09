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
        await liff.init({ liffId: "2006630915-yWlPqLrB" }); // Replace 'YOUR_LIFF_ID' with your actual LIFF ID
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          setIsLoggedIn(true);
          const profile = await liff.getProfile();
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("LIFF initialization failed:", error);
      }
    };

    initializeLiff();
  }, []);

  if (!isLoggedIn) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AppRoutes userProfile={userProfile} />
      <button onClick={() => liff.logout()}>Logout</button>
    </div>
  );
}

export default App;
