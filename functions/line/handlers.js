import {replyMessage} from "./api.js";
import saveImageToDrive from "../drive/driveUtils.js";

/**
 * LINE Webhookのエントリーポイント
 * リクエストを処理し、イベントごとに適切なアクションを実行します。
 * @param {Object} req - Expressのリクエストオブジェクト
 * @param {Object} req.body - リクエストのボディ (LINEからのイベントデータを含む)
 * @param {Array} req.body.events - LINEイベントの配列
 * @param {Object} res - Expressのレスポンスオブジェクト
 * @return {Promise<void>} - 非同期関数
 */
async function handleLineWebhook(req, res) {
  const events = req.body.events;
  if (!events || events.length === 0) {
    return res.status(200).send("No events");
  }

  for (const event of events) {
    if (event.message?.type === "image") {
      await handleImageMessage(event);
    } else {
      await replyMessage(event.replyToken, "対応していないメッセージタイプです。");
    }
  }

  res.status(200).send("Success");
}

/**
 * 画像メッセージの処理を行います。
 * @param {Object} event - LINEメッセージイベント
 * @param {string} event.replyToken - メッセージの返信に使用されるトークン
 * @param {Object} event.message - メッセージオブジェクト
 * @param {string} event.message.id - メッセージの一意のID
 * @param {string} event.source - イベントの送信元情報
 * @param {string} event.source.userId - LINEユーザーの一意のID
 * @return {Promise<void>} - 非同期関数
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
    console.log("Image saved successfully:", driveResponse);
    await replyMessage(
        replyToken,
        `画像を受け取りました。保存先: ${driveResponse.webViewLink}`,
    );
  } catch (error) {
    console.error("Error handling image message:", {
      error: error.message,
      imageUrl,
      userId,
    });
    await replyMessage(replyToken, "画像の処理中にエラーが発生しました。");
  }
}

export default handleLineWebhook;
