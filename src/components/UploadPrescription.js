import React, { useState } from "react";
import { uploadPrescription } from "../actions/prescriptionActions"; // uploadPrescriptionをインポート

function UploadPrescription() {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    setFile(e.target.files[0]); // ユーザーが選択したファイルを状態に保存
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // フォーム送信時にページリロードを防ぐ

    if (!file) {
      alert("処方箋をアップロードしてください。");
      return;
    }

    const formData = new FormData();
    formData.append("prescription", file); // 画像をFormDataに追加

    // uploadPrescription関数を呼び出して、処方箋をアップロード
    const result = await uploadPrescription(formData);

    if (result) {
      alert('処方箋がアップロードされ、LINEメッセージが送信されました。');
    } else {
      alert('処方箋のアップロードに失敗しました。');
    }
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
