import functions from "firebase-functions";
import handleLineWebhook from "./line/handlers.js";

export const lineWebhook = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    console.warn("Invalid request method:", req.method);
    return res.status(405).json({error: "Method Not Allowed"});
  }

  handleLineWebhook(req, res).catch((error) => {
    console.error("Error in lineWebhook:", error);
    res.status(500).json({error: "Internal Server Error"});
  });
});
