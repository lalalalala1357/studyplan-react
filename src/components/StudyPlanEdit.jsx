import { useState } from "react";

//plan目前修改計畫, onUpdate儲存修改, onCancel取消修改
function StudyPlanEdit({ plan, onUpdate, onCancel }) 
{
  const [planName, setPlanName] = useState(plan.planName);
  const [plannedHours, setPlannedHours] = useState(plan.plannedHours);
  const [abandoned, setAbandoned] = useState(plan.abandoned);

  async function handleSubmit(event) 
  {
    event.preventDefault();
    await onUpdate(
      plan.id,
      planName.trim(),
      Number(plannedHours),
      abandoned,
    );
    //plan.id要改的資料, planName.trim()刪除空白, Number(plannedHours)文字轉數字
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="edit-plan-name">計畫名稱：</label>
      <input id="edit-plan-name" value={planName}
        onChange={(event) => setPlanName(event.target.value)} required />
      <label htmlFor="edit-planned-hours">預計時數：</label>
      <input id="edit-planned-hours" type="number" min="0" value={plannedHours}
        onChange={(event) => setPlannedHours(event.target.value)} required />
      <label htmlFor="edit-abandoned">是否放棄：</label>
      <select
        id="edit-abandoned"
        value={String(abandoned)}
        onChange={(event) => setAbandoned(event.target.value === "true")}
      >
        <option value="false">否</option>
        <option value="true">是</option>
      </select>
      <button type="submit">儲存</button>
      <button type="button" onClick={onCancel}>取消</button>
    </form>
  );
  //htmlFor輸入框id value={planName}顯示計畫名稱
  //onChange輸入時更新 planName required不能空白
}

export default StudyPlanEdit;
