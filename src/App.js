import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import liff from "@line/liff";
import "./styles.css";

function App() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        // Initialize LIFF with the LIFF ID from environment variables
        await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });

        // If not logged in, trigger login automatically
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          // Fetch and set user profile if already logged in
          const profile = await liff.getProfile();
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("LIFF initialization failed:", error);
      }
    };

    initializeLiff();
  }, []);

  // Show loading state until userProfile is fetched
  if (!userProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AppRoutes userProfile={userProfile} />
    </div>
  );
}

export default App;
