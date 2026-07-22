import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudyPlanById } from "../services/studyPlanApi";

function StudyPlanDetail() {
  const { id } = useParams();

  const [plan, setPlan] = useState(null);

    useEffect(() => {
        async function loadPlan() {
            try {
                console.log("查詢ID:", id);

                const data = await getStudyPlanById(id);

                console.log("取得資料:", data);

                setPlan(data);
            }
            catch(error) {
                console.log(error);
            }
        }

        loadPlan();
    }, [id]);

  if (!plan) {
    return <p>載入中...</p>;
  }

  return (
    <div>
      <h1>讀書計畫詳細資料</h1>

      <h3>{plan.planName}</h3>

      <p>預計時數：{plan.plannedHours}</p>

      <p>實際時數：{plan.actualHours}</p>

      <p>
        是否放棄：
        {plan.abandoned ? "是" : "否"}
      </p>
    </div>
  );
}

export default StudyPlanDetail;