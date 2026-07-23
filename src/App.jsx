import { Route, Routes } from "react-router-dom";
import StudyPlanDetailPage from "./pages/StudyPlanDetailPage";
import StudyPlanListPage from "./pages/StudyPlanListPage";

//設定首頁與詳細頁路徑
function App() {
  return (
    <Routes>
      <Route path="/" element={<StudyPlanListPage />} />
      <Route path="/studyplans/:id" element={<StudyPlanDetailPage />} />
    </Routes>
  );
}

export default App;
