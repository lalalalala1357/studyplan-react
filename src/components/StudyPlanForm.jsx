import { useState } from "react";

function StudyPlanForm({ onCreate }) {
  const [planName, setPlanName] = useState("");
  const [plannedHours, setPlannedHours] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await onCreate(planName, Number(plannedHours));

    setPlanName("");
    setPlannedHours("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>計畫名稱：</label>
        <input
          type="text"
          value={planName}
          onChange={(event) => setPlanName(event.target.value)}
        />
      </div>

      <div>
        <label>預計時數：</label>
        <input
          type="number"
          value={plannedHours}
          onChange={(event) => setPlannedHours(event.target.value)}
        />
      </div>

      <button type="submit">新增</button>
    </form>
  );
}

export default StudyPlanForm;