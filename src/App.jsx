import { useEffect, useState } from "react";
import { Routes , Route } from "react-router-dom";
import StudyPlanDetail from "./components/StudyPlanDetail";
import StudyPlanForm from "./components/StudyPlanForm";
import StudyPlanList from "./components/StudyPlanList";
import StudyPlanEdit from "./components/StudyPlanEdit";
import {
  getStudyPlans,
  getStudyPlanById,
  createStudyPlan,
  deleteStudyPlan,
  updateStudyPlan,
} from "./services/studyPlanApi";

function App() {
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState("");
  const [editingPlan , setEditingPlan] = useState(null);

  console.log("目前修改資料:", editingPlan);

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

  async function handleView(id) {
  try {
    const plan = await getStudyPlanById(id);

    console.log(plan);

  } catch(error) {
    setMessage(error.message);
  }
}

  async function handleCreate(planName, plannedHours) {
    setMessage("");

    try {
      await createStudyPlan(planName, plannedHours);

      setMessage("新增成功");

      await loadPlans();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function  handleDelete(id)
  {
    try
    {
      await deleteStudyPlan(id);

      setMessage("刪除成功");

      await loadPlans();
    }catch (error)
    {
      setMessage(error.message);
    }
  }

async function handleUpdate(id, planName, plannedHours) {
  try {
    await updateStudyPlan(
      id,
      planName,
      plannedHours
    );

    setMessage("修改成功");

    setEditingPlan(null);

    await loadPlans();
  } catch (error) {
    setMessage(error.message);
  }
}

  return (
  <Routes>
    <Route
      path="/"
      element={
        <div>
          <h1>讀書計畫</h1>

          <StudyPlanForm onCreate={handleCreate} />

          {message && <p>{message}</p>}

          <hr />

          <StudyPlanList
            plans={plans}
            onDelete={handleDelete}
            onEdit={setEditingPlan}
            onView={(id) => {
              window.location.href = `/studyplans/${id}`;
            }}
          />

          {editingPlan && (
            <div>
              <h2>正在修改：{editingPlan.planName}</h2>

              <StudyPlanEdit
                plan={editingPlan}
                onUpdate={handleUpdate}
                onCancel={() => setEditingPlan(null)}
              />
            </div>
          )}
    />

    <Route
      path="/studyplans/:id"
      element={<StudyPlanDetail />}
    />
  </Routes>
  );
}

export default App;