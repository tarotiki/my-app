import React, { useState } from "react";

function SelectDelivery() {
  // 状態管理
  const [deliveryMethod, setDeliveryMethod] = useState(""); // 配達方法（受け取り or 配達）
  const [selectedSlot, setSelectedSlot] = useState("");     // 選択された時間スロット
  const [confirmationMessage, setConfirmationMessage] = useState(""); // 確認メッセージ

  // 時間スロットのリスト
  const timeSlots = [
    "09:00 - 11:00",
    "11:00 - 13:00",
    "13:00 - 15:00",
    "15:00 - 17:00",
    "17:00 - 19:00",
  ];

  // フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault(); // フォームのデフォルト動作をキャンセル

    // バリデーション: 全ての選択肢が選ばれているか確認
    if (!deliveryMethod || !selectedSlot) {
      setConfirmationMessage("すべての項目を選択してください。");
      return;
    }

    // サーバーにデータ送信（例）
    fetch("https://your-backend-api.com/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deliveryMethod,
        selectedSlot,
        userId: "LINE_USER_ID", // 必要ならユーザー情報を含める
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("予約成功:", data);
        setConfirmationMessage(
          `予約が確定しました: ${deliveryMethod}, ${selectedSlot}`
        );
      })
      .catch((error) => {
        console.error("エラー:", error);
        setConfirmationMessage("予約に失敗しました。再試行してください。");
      });
  };

  return (
    <div className="select-delivery-container">
      <h1>受け取り方法の選択</h1>
      <form onSubmit={handleSubmit}>
        <h2>受け取り方法</h2>
        <label>
          <input
            type="radio"
            name="deliveryMethod"
            value="受け取り"
            onChange={(e) => setDeliveryMethod(e.target.value)}
          />
          店頭で受け取り
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="deliveryMethod"
            value="配達"
            onChange={(e) => setDeliveryMethod(e.target.value)}
          />
          配達を希望
        </label>

        <h2>予約時間を選択</h2>
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value="">時間を選択してください</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <button type="submit">予約を確定</button>
      </form>

      {confirmationMessage && <p className="confirmation">{confirmationMessage}</p>}
    </div>
  );
}

export default SelectDelivery;
