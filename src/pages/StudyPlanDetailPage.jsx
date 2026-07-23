import { useCallback, useEffect, useState } from "react";
//useCallback保存錯誤 計畫 編輯, useEffect載入資料, useState保存loadPlan函式
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteStudyPlan,
  getStudyPlanById,
  updateStudyPlan,
} from "../services/studyPlanApi";
import StudyPlanEdit from "../components/StudyPlanEdit";

//詳細頁元件
function StudyPlanDetailPage() {
  //取網址ID 保存資料 訊息 編輯狀態
  const { id } = useParams(); //編號
  const navigate = useNavigate(); //切頁面
  const [plan, setPlan] = useState(null); //讀書計畫
  const [error, setError] = useState(""); //載入失敗訊息
  const [message, setMessage] = useState(""); //修改錯誤訊息
  const [isEditing, setIsEditing] = useState(false); //顯示修改表單

  //載入讀書計畫 失敗保存錯誤
  const loadPlan = useCallback(async () => 
  {
    setError("");
    try {
      setPlan(await getStudyPlanById(id));
    } catch (loadError) {
      setError(loadError.message);
    }
  }, [id]);

  //換頁面 自動載入資料
  useEffect(() => 
  {
    loadPlan();
  }, [loadPlan]);

  //修改送後端 再刷新跟關閉表單
  async function handleUpdate(planId, planName, plannedHours, abandoned) {
    setMessage("");
    try {
      await updateStudyPlan(
        planId,
        planName,
        plannedHours,
        plan.actualHours,
        abandoned,
      );
      await loadPlan();
      setIsEditing(false);
      setMessage("修改成功");
    } catch (updateError) {
      setMessage(updateError.message);
    }
  }

  //刪除計畫 返回首頁
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

  //失敗顯示錯誤 返回
  if (error) {
    return <main><p role="alert">{error}</p><Link to="/">返回列表</Link></main>;
  }

  //沒載入顯示提示
  if (!plan) {
    return <p>載入中…</p>;
  }

  //詳細頁
  //可以修改 刪除 回列表
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

export default StudyPlanDetailPage;
