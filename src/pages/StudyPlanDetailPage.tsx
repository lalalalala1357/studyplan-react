import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StudyPlanEdit from "../components/StudyPlanEdit";
import { deleteStudyPlan, getStudyPlanById, updateStudyPlan } from "../services/studyPlanApi";
import type { StudyPlan } from "../types/studyPlan";

export default function StudyPlanDetailPage() 
{
  const { id } = useParams<{ id: string }>();
  const planId = Number(id);
  const navigate = useNavigate();
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const loadPlan = useCallback(async () => 
  {
    if (!id || !Number.isInteger(planId)) { setError("無效的計畫編號"); return; }
    setError("");

    try 
    { setPlan(await getStudyPlanById(planId)); }
    
    catch (error) 
    { setError(error instanceof Error ? error.message : "讀取失敗"); }
  }, [id, planId]);

  useEffect(() => { void loadPlan(); }, [loadPlan]);

  async function handleUpdate(updatedId: number, name: string, hours: number, abandoned: boolean) 
  {
    if (!plan) return;
    setMessage("");

    try 
    {
      await updateStudyPlan(updatedId, name, hours, plan.actualHours, abandoned);
      await loadPlan(); setIsEditing(false); setMessage("更新成功");
    } 
    
    catch (error) 
    { setMessage(error instanceof Error ? error.message : "更新失敗"); }
  }

  async function handleDelete() 
  {
    if (!plan || !window.confirm(`確定要刪除「${plan.planName}」嗎？`)) return;

    try 
    { await deleteStudyPlan(plan.id); navigate("/", { replace: true }); }
    
    catch (error) 
    { setMessage(error instanceof Error ? error.message : "刪除失敗"); }
  }

  if (error) return <main><p role="alert">{error}</p><Link to="/">回到列表</Link></main>;

  if (!plan) return <p>載入中…</p>;
  
  return (
    <main><h1>讀書計畫詳情</h1><h3>{plan.planName}</h3><p>預計時數：{plan.plannedHours}</p>
      <p>實際時數：{plan.actualHours}</p><p>是否放棄：{plan.abandoned ? "是" : "否"}</p>
      {message && <p role="status">{message}</p>}
      {isEditing ? <StudyPlanEdit plan={plan} onUpdate={handleUpdate} onCancel={() => setIsEditing(false)} /> : <button type="button" onClick={() => setIsEditing(true)}>編輯</button>}
      <button type="button" onClick={handleDelete}>刪除</button><Link to="/">回到列表</Link>
    </main>
  );
}
