// src/routes.js
import Home from "./components/Home";
import UploadPrescription from "./components/UploadPrescription";
import Appointments from "./components/Appointments";
import Notifications from "./components/Notifications";
import SelectDelivery from "./components/SelectDelivery"; // 新規コンポーネントをインポート
import FormRoutes from "./routes/FormRoutes"; // FormRoutes をインポート

const routes = [
  { path: "/", element: <Home /> }, // ホーム画面
  { path: "/upload", element: <UploadPrescription /> }, // 処方箋アップロード
  { path: "/appointments", element: <Appointments /> }, // 予約一覧
  { path: "/notifications", element: <Notifications /> }, // 通知一覧
  { path: "/select-delivery", element: <SelectDelivery /> }, // 新規追加: 受け取り方法選択
  { path: "/form/*", element: <FormRoutes /> }, // FormRoutes を参照
];

export default routes;
