const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// JSONリクエストのパースを有効化
app.use(bodyParser.json());

// Google Sheets API 設定
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json", // サービスアカウントキーのファイルパス
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SPREADSHEET_ID = "あなたのスプレッドシートID"; // ここにスプレッドシートIDを記述

// フォームデータを保存するエンドポイント
app.post('/api/save-form', async (req, res) => {
    try {
        const { name, phone, postalCode, address, birthDate } = req.body;
        console.log('リクエストデータ:', req.body); // リクエスト内容を確認

        const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
        console.log('スプレッドシートを初期化しました');

        // credentials.jsonのパスを指定
        await doc.useServiceAccountAuth(require('./credentials.json'));
        console.log('認証成功');

        await doc.loadInfo();
        console.log('スプレッドシート情報を読み込みました');

        const sheet = doc.sheetsByIndex[0]; // 最初のシートを取得
        console.log('シート取得成功');

        await sheet.addRow({ Name: name, Phone: phone, PostalCode: postalCode, Address: address, BirthDate: birthDate });
        console.log('データを追加しました');

        res.status(200).send('データが保存されました');
    } catch (error) {
        console.error('エラー詳細:', error); // エラー詳細をログ出力
        res.status(500).send('データの保存中にエラーが発生しました');
    }
});


// ルートエンドポイント
app.get("/", (req, res) => {
    res.send("サーバーが動作しています！");
});

server.listen(3000, () => {
    console.log("サーバーが http://localhost:3000 で起動しました。");
});
