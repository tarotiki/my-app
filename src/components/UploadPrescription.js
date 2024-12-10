import React, { useState } from "react";
import { uploadPrescription } from "../actions/prescriptionActions.js"; // uploadPrescriptionをインポート
import { gdrive } from "../functions/driveUtils.js"; // 画像保存先との接続

function UploadPrescription() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // アップロード中かどうかを管理

  const handleUpload = (e) => {
    setFile(e.target.files[0]); // ユーザーが選択したファイルを状態に保存
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // フォーム送信時にページリロードを防ぐ

    if (!file) {
      alert("処方箋をアップロードしてください。");
      return;
    }

    setIsUploading(true); // アップロード中の状態にする

    const formData = new FormData();
    formData.append("prescription", file); // 画像をFormDataに追加

    // uploadPrescription関数を呼び出して、処方箋をアップロード
    const result = await uploadPrescription(formData);

    if (result) {
      // 処方箋アップロードが成功したら、Google Driveに保存する
      const saveResult = await gdrive.saveImageToDrive(file); // gdrivehandlerを呼び出して画像を保存

      if (saveResult) {
        alert("処方箋がアップロードされ、画像がGoogle Driveに保存されました。");
      } else {
        alert("画像の保存に失敗しました。");
      }
    } else {
      alert('処方箋のアップロードに失敗しました。');
    }

    // 少し待ってからブラウザを閉じる
    setTimeout(() => {
      window.close(); // ブラウザを閉じる
    }, 2000); // 2秒後にブラウザを閉じる

    setIsUploading(false); // アップロード完了後、アップロード中の状態を解除
  };

  return (
    <div>
      <h1>処方箋アップロード</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleUpload} disabled={isUploading} />
        <button type="submit" disabled={isUploading}>送信</button>
      </form>
    </div>
  );
}

export default UploadPrescription;
