import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import StudyPlanDetail from "./components/StudyPlanDetail";
import StudyPlanForm from "./components/StudyPlanForm";
import StudyPlanList from "./components/StudyPlanList";
import { createStudyPlan, getStudyPlans } from "./services/studyPlanApi";

function App() {
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function loadPlans() {
    try {
      const data = await getStudyPlans();
      setPlans(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  async function handleCreate(planName, plannedHours) {
    setMessage("");
    try {
      await createStudyPlan(planName, plannedHours);
      setMessage("新增成功");
      await loadPlans();
      return true;
    } catch (error) {
      setMessage(error.message);
      return false;
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            <h1>讀書計畫</h1>
            <StudyPlanForm onCreate={handleCreate} />
            {message && <p role="status">{message}</p>}
            <hr />
            <StudyPlanList
              plans={plans}
              onView={(id) => navigate(`/studyplans/${id}`)}
            />
          </main>
        }
      />
      <Route path="/studyplans/:id" element={<StudyPlanDetail />} />
    </Routes>
  );
}

export default App;
