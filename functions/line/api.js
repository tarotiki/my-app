import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
/**
 * LINEメッセージを返信する関数
 * @param {string} replyToken 返信トークン
 * @param {string} message 返信するメッセージ
 * @return {Promise<void>} 非同期処理
 */
export async function replyMessage(replyToken, message) {
  const lineApiUrl = "https://api.line.me/v2/bot/message/reply";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer {CHANNEL_ACCESS_TOKEN}`, // 必要なトークンを設定
  };

  const body = {
    replyToken,
    messages: [{type: "text", text: message}],
  };

  await axios.post(lineApiUrl, body, {headers});
}


