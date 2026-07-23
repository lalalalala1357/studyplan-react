import { useState, type FormEvent } from "react";
import type { StudyPlan } from "../types/studyPlan";

interface Props 
{
  plan: StudyPlan;
  onUpdate: (id: number, name: string, hours: number, abandoned: boolean) => Promise<void>;
  onCancel: () => void;
}

export default function StudyPlanEdit({ plan, onUpdate, onCancel }: Props) 
{
  const [planName, setPlanName] = useState(plan.planName);
  const [plannedHours, setPlannedHours] = useState(String(plan.plannedHours));
  const [abandoned, setAbandoned] = useState(plan.abandoned);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) 
  {
    event.preventDefault();
    await onUpdate(plan.id, planName.trim(), Number(plannedHours), abandoned);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="edit-plan-name">計畫名稱：</label>
      <input id="edit-plan-name" value={planName} onChange={(event) => setPlanName(event.target.value)} required />
      <label htmlFor="edit-planned-hours">預計時數：</label>
      <input id="edit-planned-hours" type="number" min="0" value={plannedHours} onChange={(event) => setPlannedHours(event.target.value)} required />
      <label htmlFor="edit-abandoned">是否放棄：</label>
      <select id="edit-abandoned" value={String(abandoned)} onChange={(event) => setAbandoned(event.target.value === "true")}>
        <option value="false">否</option><option value="true">是</option>
      </select>
      <button type="submit">儲存</button><button type="button" onClick={onCancel}>取消</button>
    </form>
  );
}
