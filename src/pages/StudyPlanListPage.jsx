import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import StudyPlanForm from "../components/StudyPlanForm";
import StudyPlanListContent from "../components/StudyPlanList";
import { createStudyPlan, getStudyPlans } from "../services/studyPlanApi";
import { useQuery , useQueryClient } from "@tanstack/react-query";

//保存/載入計畫與處理新增功能
function StudyPlanListPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  //plans保存計畫 , message保存訊息 , navigate切頁面
  const queryClient = useQueryClient();

  //進入首頁時載入
  const
  {
    data : plans = [],
    isLoading,
    error,
  } = useQuery({
    queryKey : ["studyplans"],
    queryFn : getStudyPlans,
  });

  //新增 成功刷新 清空表單 失敗回false
  async function handleCreate(planName, plannedHours) {
    setMessage("");
    try {
      await createStudyPlan(planName, plannedHours);

      await queryClient.invalidateQueries({
        queryKey : ["studyplans"],
      });
      setMessage("新增成功");

      return true;
    } 
    catch (error)
    {
      setMessage(error.message);
      return false;
    }
  }

  if(isLoading)
  {
    return <p>資料載入中...</p>
  }

  return (
    <main>
      <h1>讀書計畫</h1>
      <StudyPlanForm onCreate={handleCreate} />
      {message && <p role="status">{message}</p>}
      {error && <p role = "alert">{error.message}</p>}
      <hr />
      <StudyPlanListContent
        plans={plans}
        onView={(id) => navigate(`/studyplans/${id}`)}
      />
    </main>
  );
}

export default StudyPlanListPage;