import React, { useState } from "react";
import { uploadPrescription } from "../actions/prescriptionActions";

function UploadPrescription() {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("処方箋をアップロードしてください。");
      return;
    }

    const formData = new FormData();
    formData.append("prescription", file);

    uploadPrescription(formData);
  };

  return (
    <div>
      <h1>処方箋アップロード</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleUpload} />
        <button type="submit">送信</button>
      </form>
    </div>
  );
}

export default UploadPrescription;
