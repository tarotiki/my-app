/**
 * ログを出力する関数
 * @param {string} value ログに出力する値
 * @return {void}
 */
function logDebug(value) {
  console.log(`[DEBUG] ${new Date().toISOString()}: ${value}`);
}
export default {logDebug};
