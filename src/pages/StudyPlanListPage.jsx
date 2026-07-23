import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudyPlanForm from "../components/StudyPlanForm";
import StudyPlanListContent from "../components/StudyPlanList";
import { createStudyPlan, getStudyPlans } from "../services/studyPlanApi";

//保存/載入計畫與處理新增功能
function StudyPlanListPage() {
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  //plans保存計畫 , message保存訊息 , navigate切頁面

  //取得所有計畫 成功存plan 失敗存message
  const loadPlans = useCallback(async () => {
    try {
      const data = await getStudyPlans();
      setPlans(data);
    } catch (error) {
      setMessage(error.message);
    }
  }, []);

  //進入首頁時載入
  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  //新增 成功刷新 清空表單 失敗回false
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
    <main>
      <h1>讀書計畫</h1>
      <StudyPlanForm onCreate={handleCreate} />
      {message && <p role="status">{message}</p>}
      <hr />
      <StudyPlanListContent
        plans={plans}
        onView={(id) => navigate(`/studyplans/${id}`)}
      />
    </main>
  );
}

export default StudyPlanListPage;
