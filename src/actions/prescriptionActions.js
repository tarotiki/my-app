/**
 * 処方箋をサーバーにアップロードする関数
 * @param {FormData} formData - アップロードするファイルデータ
 * @returns {Promise<boolean>} - アップロード成功の場合はtrue、それ以外はfalse
 */

  /**
   * Google Drive に処方箋画像を保存する関数
   * @param {File} file - 処方箋ファイル
   * @param {string} userId - ユーザーID
   * @returns {Promise<any>} - 処方箋画像保存結果
   */
  export const saveImageToDrive = async (file, userId) => {
    try {
      const base64Data = await convertFileToBase64(file);
      const functionUrl =
        process.env.REACT_APP_FUNCTION_URL ||
        "https://saveimagetodrivefunction-vtfwmzqvpa-uc.a.run.app"; // 正しいURLに修正
  
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name, // ファイル名
          base64Data, // Base64エンコードしたファイルデータ
          userId, // ユーザーID
        }),
      });
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("画像の保存中にエラーが発生しました", error);
      throw error;
    }
  };
  
  /**
   * ファイルをBase64に変換するヘルパー関数
   * @param {File} file - 変換するファイル
   * @returns {Promise<string>} - Base64エンコードされたデータ
   */
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  