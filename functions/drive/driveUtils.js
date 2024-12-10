import axios from "axios";
import {google} from "googleapis";
import {Readable} from "stream";
import {config} from "firebase-functions";

const GOOGLE_DRIVE_FOLDER_ID = config().drive.folder_id;
/**
 * Saves an image to Google Drive in a specific folder.
 *
 * @param {string} imageUrl - The URL of the image to save.
 * @param {string} userId - The user ID to associate with the image file name.
 * @return {Promise<Object>} A promise that resolves to an object containing
 * file metadata, including the file ID and web view link.
 * @throws {Error} Throws an error if the image cannot be fetched
 * or the file cannot be uploaded to Google Drive.
 */
async function saveImageToDrive(imageUrl, userId) {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const drive = google.drive({
    version: "v3",
    auth: await auth.getClient(),
  });

  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });
  const imageData = response.data;

  const fileName = `${userId}_${Date.now()}.jpg`;
  const fileMetadata = {
    name: fileName,
    parents: [GOOGLE_DRIVE_FOLDER_ID],
  };

  const media = {
    mimeType: "image/jpeg",
    body: Readable.from(imageData),
  };

  const file = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id, webViewLink",
  });

  return file.data;
}

export default {saveImageToDrive};
