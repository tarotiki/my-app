import replyMessage from "./api.js";
import saveImageToDrive from "../drive/driveUtils.js";

/**
 * LINE Webhookを処理する関数
 * @param {Object} req リクエストオブジェクト
 * @param {Object} res レスポンスオブジェクト
 * @return {Promise<void>} 非同期処理
 */
async function handleLineWebhook(req, res) {
  const events = req.body.events;
  if (!events || events.length === 0) {
    return res.status(200).send("No events");
  }

  for (const event of events) {
    if (event.message.type === "image") {
      await handleImageMessage(event);
    } else {
      await replyMessage(event.replyToken, "対応していないメッセージタイプです。");
    }
  }

  res.status(200).send("Success");
}

/**
 * 画像メッセージを処理する関数
 * @param {Object} event LINEイベントオブジェクト
 * @return {Promise<void>} 非同期処理
 */
async function handleImageMessage(event) {
  const {
    replyToken,
    message: {id: messageId},
    source: {userId},
  } = event;

  const imageUrl = `https://api-data.line.me/v2/bot/message/${messageId}/content`;

  try {
    const driveResponse = await saveImageToDrive(imageUrl, userId);
    await replyMessage(replyToken,
        `画像を受け取りました。保存先: ${driveResponse.webViewLink}`);
  } catch (error) {
    console.error("Error handling image message:", error);
    await replyMessage(replyToken, "画像の処理中にエラーが発生しました。");
  }
}

export default {handleLineWebhook};

