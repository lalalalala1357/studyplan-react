import { useState } from "react";

function StudyPlanEdit({ plan, onUpdate, onCancel }) {
  const [planName, setPlanName] = useState(plan.planName);
  const [plannedHours, setPlannedHours] = useState(plan.plannedHours);

  async function handleSubmit(event) {
    event.preventDefault();
    await onUpdate(plan.id, planName.trim(), Number(plannedHours));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="edit-plan-name">計畫名稱：</label>
      <input id="edit-plan-name" value={planName}
        onChange={(event) => setPlanName(event.target.value)} required />
      <label htmlFor="edit-planned-hours">預計時數：</label>
      <input id="edit-planned-hours" type="number" min="0" value={plannedHours}
        onChange={(event) => setPlannedHours(event.target.value)} required />
      <button type="submit">儲存</button>
      <button type="button" onClick={onCancel}>取消</button>
    </form>
  );
}

export default StudyPlanEdit;
