import axios from "axios";
import functions from "firebase-functions";

/**
 * LINEメッセージを返信する関数
 * @param {string} replyToken 返信トークン
 * @param {string} messageText 返信するメッセージ
 * @return {Promise<void>} 非同期処理
 */
async function replyMessage(replyToken, messageText) {
  const url = "https://api.line.me/v2/bot/message/reply";
  const headers = {
    "Content-Type": "application/json",
    "Authorization":
    `Bearer ${process.env.LINE_TOKEN || functions.config().line.token}`,
  };

  const body = {
    replyToken: replyToken,
    messages: [{type: "text", text: messageText}],
  };

  await axios.post(url, body, {headers});
}

export default {replyMessage};

