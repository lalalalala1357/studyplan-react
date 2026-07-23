import { Route, Routes } from "react-router-dom";
import StudyPlanDetailPage from "./pages/StudyPlanDetailPage";
import StudyPlanListPage from "./pages/StudyPlanListPage";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StudyPlanListPage />} />
      <Route path="/studyplans/:id" element={<StudyPlanDetailPage />} />
    </Routes>
  );
}
