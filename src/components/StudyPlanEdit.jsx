import { useState } from "react";

function StudyPlanEdit({ plan, onUpdate, onCancel }) {
  const [planName, setPlanName] = useState(plan.planName);
  const [plannedHours, setPlannedHours] = useState(plan.plannedHours);

  async function handleSubmit(event) {
    event.preventDefault();

    await onUpdate(
      plan.id,
      planName,
      Number(plannedHours)
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
      />

      <input
        type="number"
        value={plannedHours}
        onChange={(e) => setPlannedHours(e.target.value)}
      />

      <button type="submit">
        儲存
      </button>

      <button
        type="button"
        onClick={onCancel}
      >
        取消
      </button>
    </form>
  );
}

export default StudyPlanEdit;