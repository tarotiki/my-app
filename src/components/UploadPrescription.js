import React, { useState } from "react";
import { uploadPrescription, saveImageToDrive } from "../actions/prescriptionActions.js"; // 先ほど作成したアクションをインポート

function UploadPrescription() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // アップロード中かどうかを管理
  const [userId, setUserId] = useState("12345"); // ユーザーID（例として固定値）

  const handleUpload = (e) => {
    setFile(e.target.files[0]); // ユーザーが選択したファイルを状態に保存
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // フォーム送信時にページリロードを防ぐ

    if (!file) {
      alert("処方箋をアップロードしなさい。");
      return;
    }

    setIsUploading(true); // アップロード中の状態にする

    try {
      // 1. 処方箋をサーバーにアップロード
      const formData = new FormData();
      formData.append("prescription", file);

      const result = await saveImageToDrive(file, userId);
      if (result) {
        // 2. アップロード成功時、クラウドファンクションを呼び出してGoogle Driveに保存
        const saveResult = await saveImageToDrive(file, userId);

        if (saveResult.success) {
          alert("処方箋がアップロードされ、画像がGoogle Driveに保存されました。");
        } else {
          alert(`画像の保存に失敗しました: ${saveResult.message || "不明なエラー"}`);
        }
      } else {
        alert("処方箋のアップロードに失敗しました。");
      }
    } catch (error) {
      console.error("エラー:", error);
      alert("処理中にエラーが発生しました。");
    } finally {
      setIsUploading(false); // アップロード完了後、アップロード中の状態を解除
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>処方箋アップロード</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="file"
          onChange={handleUpload}
          disabled={isUploading}
          accept="image/*"
          style={{ marginBottom: "10px" }}
        />
        <button type="submit" disabled={isUploading} style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none" }}>
          {isUploading ? "アップロード中..." : "送信"}
        </button>
      </form>
    </div>
  );
}

export default UploadPrescription;
