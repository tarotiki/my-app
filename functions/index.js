const functions = require("firebase-functions");
const axios = require("axios");

const LINE_CHANNEL_ACCESS_TOKEN = "Dd4RmSSMAI5itzcXDO4lbW0T"+
"mVOXXno3TH58Y9U4K8n+zraIsRW117/"+
"rcJZu949R9RUmP2THYDjHH6ipSgoY9SphArLpFps"+
"ZypnNdAl/GD1+"+
"r4cDY60TKhJ2IaaAFHL2uDMqE2OKALH2Rex5f1dg+"+
"QdB04t89/1O/w1cDnyilFU=";

// ここにLINEチャネルアクセストークンを設定
// const LINE_CHANNEL_SECRET =
// "75b4718c7f8f48b62f1578b41d68cff6";
// ここにLINEチャネルシークレットを設定

// LINE Messaging API Webhook
exports.lineWebhook = functions.https.onRequest(async (req, res) => {
  //  LINE プラットフォームが送信したリクエストのみを処理
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }
  try {
    const events = req.body.events;
    // イベントが存在する場合
    if (events && events.length > 0) {
      for (const event of events) {
        if (event.type === "message" && event.message.type === "text") {
          // メッセージが送信された場合、"テスト" と返信
          await replyMessage(event.replyToken, "テスト");
        }
      }
    }
    // LINE API へ成功レスポンスを返す
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error processing webhook event:", error);
    res.status(500).send("Error processing webhook event.");
  }
});
// メッセージを返信する関数
const replyMessage = async (replyToken, message) => {
  const url = "https://api.line.me/v2/bot/message/reply";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
  };

  const body = {
    replyToken: replyToken,
    messages: [
      {
        type: "text",
        text: message,
      },
    ],
  };

  // LINE Messaging API にリクエストを送信
  await axios.post(url, body, {headers});
};
