import functions from "firebase-functions";
import handleLineWebhook from "./line/handlers.js";

export const lineWebhook = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }
  handleLineWebhook(req, res);
});

