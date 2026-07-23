import { useState } from "react";

//顯示新增表單
function StudyPlanForm({ onCreate }) {
  const [planName, setPlanName] = useState("");
  const [plannedHours, setPlannedHours] = useState("");

  //送出新增資料 成功再清空
  async function handleSubmit(event) {
    event.preventDefault();
    const created = await onCreate(planName.trim(), Number(plannedHours));
    if (created) {
      setPlanName("");
      setPlannedHours("");
    }
  }

  //event.target.value輸入框的內容
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="plan-name">計畫名稱：</label>
        <input id="plan-name" type="text" value={planName}
          onChange={(event) => setPlanName(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="planned-hours">預計時數：</label>
        <input id="planned-hours" type="number" min="0" value={plannedHours}
          onChange={(event) => setPlannedHours(event.target.value)} required />
      </div>
      <button type="submit">新增</button>
    </form>
  );
}

export default StudyPlanForm;
