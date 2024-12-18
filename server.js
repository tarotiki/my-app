const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(express.json());

// Google Sheets API の設定
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const credentials = JSON.parse(fs.readFileSync('credentials.json'));

// 認証クライアントの作成
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

// スプレッドシートの操作関数
async function appendToSheet(data) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });
  const spreadsheetId = process.env.SPREADSHEET_ID; // 環境変数からスプレッドシートIDを取得
  const range = 'Sheet1!A1:E1'; // 適宜変更
  const valueInputOption = 'RAW';

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption,
    resource: {
      values: [data],
    },
  });
}

// POST リクエストの受け取り
app.post('/api/save-form', async (req, res) => {
  try {
    const { name, phone, postalCode, address, birthDate } = req.body;

    if (!name || !phone || !postalCode || !address || !birthDate) {
      return res.status(400).send('すべてのフィールドを入力してください。');
    }

    // データをスプレッドシートに追加
    await appendToSheet([name, phone, postalCode, address, birthDate]);
    res.status(200).send('データが保存されました！');
  } catch (error) {
    console.error('エラー:', error.message);
    res.status(500).send('サーバーエラーが発生しました。');
  }
});

// サーバーの起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
