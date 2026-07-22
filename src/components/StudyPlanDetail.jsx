import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteStudyPlan,
  getStudyPlanById,
  updateStudyPlan,
} from "../services/studyPlanApi";
import StudyPlanEdit from "./StudyPlanEdit";

function StudyPlanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const loadPlan = useCallback(async () => {
    setError("");
    try {
      setPlan(await getStudyPlanById(id));
    } catch (loadError) {
      setError(loadError.message);
    }
  }, [id]);

  useEffect(() => {
    loadPlan();
  }, [loadPlan]);

  async function handleUpdate(planId, planName, plannedHours) {
    setMessage("");
    try {
      await updateStudyPlan(
        planId,
        planName,
        plannedHours,
        plan.actualHours,
        plan.abandoned,
      );
      await loadPlan();
      setIsEditing(false);
      setMessage("修改成功");
    } catch (updateError) {
      setMessage(updateError.message);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`確定要刪除「${plan.planName}」嗎？`)) return;

    setMessage("");
    try {
      await deleteStudyPlan(plan.id);
      navigate("/", { replace: true });
    } catch (deleteError) {
      setMessage(deleteError.message);
    }
  }

  if (error) {
    return <main><p role="alert">{error}</p><Link to="/">返回列表</Link></main>;
  }
  if (!plan) {
    return <p>載入中…</p>;
  }

  return (
    <main>
      <h1>讀書計畫詳細資料</h1>
      <h3>{plan.planName}</h3>
      <p>預計時數：{plan.plannedHours}</p>
      <p>實際時數：{plan.actualHours}</p>
      <p>是否放棄：{plan.abandoned ? "是" : "否"}</p>
      {message && <p role="status">{message}</p>}
      {isEditing ? (
        <StudyPlanEdit
          plan={plan}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <button type="button" onClick={() => setIsEditing(true)}>修改</button>
      )}
      <button type="button" onClick={handleDelete}>刪除</button>
      <Link to="/">返回列表</Link>
    </main>
  );
}

export default StudyPlanDetail;
