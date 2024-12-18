import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "../routes";

function AppRoutes({ userProfile }) {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={React.cloneElement(route.element, { userProfile })}
        />
      ))}
    </Routes>
  );
}

export default AppRoutes;
