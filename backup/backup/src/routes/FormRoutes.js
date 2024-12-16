// src/routes/FormRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "../components/Form"; // フォームコンポーネントをインポート

const FormRoutes = () => {
  return (
    <Routes>
      <Route path="/section/:sectionId" element={<Form />} />
    </Routes>
  );
};

export default FormRoutes;


