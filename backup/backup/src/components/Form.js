import React, { useState } from 'react';
import './PrescriptionForm.css'; // CSSをインポート
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    postalCode: "",
    address: "",
    birthDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const goToNextSection = () => {
    const nextSectionId = parseInt(sectionId) + 1; // 次のセクションIDを計算
    navigate(`/form/section/${nextSectionId}`); // 正しいURLに遷移
  };

  const goToPreviousSection = () => {
    const preSectionId = parseInt(sectionId) - 1; // 次のセクションIDを計算
    navigate(`/form/section/${preSectionId}`); // 正しいURLに遷移
  };

  return (
    <div>
      {sectionId === "1" && (
        <div>
          <h2>セクション 1</h2>
          <input
            type="text"
            name="name"
            placeholder="名前"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="住所"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
      )}

      {sectionId === "2" && (
        <div>
          <h2>セクション 2</h2>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
          />
        </div>
      )}

      <button onClick={goToPreviousSection} disabled={sectionId === "1"}>
        前のセクション
      </button>
      <button onClick={goToNextSection}>次のセクション</button>
    </div>
  );
};

export default Form;
