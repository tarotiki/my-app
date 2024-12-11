import {https} from "firebase-functions";
import {google} from "googleapis";
import mime from "mime"; // ファイルの拡張子からMIMEタイプを判定するライブラリ

/**
 * Google Driveに画像を保存するCloud Function
 * @param {Object} req - HTTPリクエストオブジェクト
 * @param {Object} res - HTTPレスポンスオブジェクト
 */
const saveImageToDrive = https.onRequest(async (req, res) => {
  // HTTPメソッドがPOST以外の場合、エラーを返す
  if (req.method !== "POST") {
    res.status(405).send({error: "Method not allowed"});
    return;
  }

  // リクエストボディから必要なパラメータを取得
  const {fileName, base64Data, userId} = req.body;

  // 必須パラメータが不足している場合、エラーを返す
  if (!fileName || !base64Data || !userId) {
    console.error("Missing parameters:", {
      fileName, // アップロードするファイルの名前
      hasBase64Data: !!base64Data, // Base64データが含まれているか
      userId, // 保存対象ユーザーのID
    });
    res.status(400).send({error: "Missing required parameters"});
    return;
  }

  try {
    // Google Drive APIへの認証クライアントを設定
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/drive.file"], // Google Driveにファイルを保存するスコープ
    });

    const drive = google.drive({
      version: "v3",
      auth: await auth.getClient(),
    });

    // ファイルデータの準備
    const fileBuffer = Buffer.from(base64Data, "base64"); // Base64データをバイナリに変換
    const mimeType = mime.getType(fileName) ||
    "application/octet-stream"; // MIMEタイプを判定

    // Google Drive内にユーザーごとのフォルダを作成
    const folderName = `User_${userId}`; // ユーザーごとにフォルダを分ける
    let folderId;

    // フォルダの存在確認と作成
    const folderResponse = await drive.files.list({
      q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'
      and trashed=false`,
      fields: "files(id, name)",
    });

    if (folderResponse.data.files.length > 0) {
      // 既存フォルダが見つかった場合
      folderId = folderResponse.data.files[0].id;
    } else {
      // 新しいフォルダを作成
      const folderMetadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
      };

      const folder = await drive.files.create({
        resource: folderMetadata,
        fields: "id",
      });

      folderId = folder.data.id;
    }

    // ファイルをGoogle Driveにアップロード
    const fileMetadata = {
      name: fileName, // 保存するファイルの名前
      parents: [folderId], // 作成したフォルダ内に保存
    };

    const media = {
      mimeType, // MIMEタイプ
      body: fileBuffer, // ファイルのデータ
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    res.status(200).send({success: true, fileId: response.data.id});
  } catch (error) {
    console.error("Error saving file to Google Drive:", error);
    res.status(500).send({success: false, error: error.message});
  }
});
export default saveImageToDrive;
