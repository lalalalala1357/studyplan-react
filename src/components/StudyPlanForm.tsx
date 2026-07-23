import { useState, type FormEvent } from "react";

interface Props 
{
  onCreate: (planName: string, plannedHours: number) => Promise<boolean>;
}

export default function StudyPlanForm({ onCreate }: Props) 
{
  const [planName, setPlanName] = useState("");
  const [plannedHours, setPlannedHours] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) 
  {
    event.preventDefault();
    
    if (await onCreate(planName.trim(), Number(plannedHours))) 
    {
      setPlanName("");
      setPlannedHours("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div><label htmlFor="plan-name">計畫名稱：</label><input id="plan-name" value={planName} onChange={(event) => setPlanName(event.target.value)} required /></div>
      <div><label htmlFor="planned-hours">預計時數：</label><input id="planned-hours" type="number" min="0" value={plannedHours} onChange={(event) => setPlannedHours(event.target.value)} required /></div>
      <button type="submit">新增</button>
    </form>
  );
}
