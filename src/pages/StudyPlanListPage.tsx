import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import StudyPlanForm from "../components/StudyPlanForm";
import StudyPlanList from "../components/StudyPlanList";
import { createStudyPlan, getStudyPlans } from "../services/studyPlanApi";
import { useStudyPlanUiStore } from "../stores/useStudyPlanUiStore";

export default function StudyPlanListPage() {
  const [message, setMessage] = useState("");
  //Store裡只取出searchText
  const searchText = useStudyPlanUiStore((state) => state.searchText);
  //修改
  const setSearchText = useStudyPlanUiStore((state) => state.setSearchText);
  //清除
  const clearSearch = useStudyPlanUiStore((state) => state.clearSearch);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: plans = [], isLoading, error } = useQuery({ queryKey: ["studyplans"], queryFn: getStudyPlans });

  async function handleCreate(planName: string, plannedHours: number): Promise<boolean> {
    setMessage("");
    try 
    {
      await createStudyPlan(planName, plannedHours);
      await queryClient.invalidateQueries({ queryKey: ["studyplans"] });
      setMessage("新增成功");
      return true;
    } 

    catch (error) 
    {
      setMessage(error instanceof Error ? error.message : "新增失敗");
      return false;
    }
  }

  if (isLoading) return <p>資料載入中…</p>;

  const filteredPlans = plans.filter((plan) =>
  plan.planName
    .toLocaleLowerCase()
    .includes(searchText.trim().toLowerCase()))

  return (
    <main><h1>讀書計畫</h1>
      <StudyPlanForm onCreate={handleCreate} />
      <div>
        <label htmlFor="plan-search">
          搜尋計畫
        </label>

        <input
        id="plan-search"
        type="search"
        value={searchText}
        onChange = {(event) => setSearchText(event.target.value)}
        />

        <button
          type="button"
          onClick={clearSearch}
        >
          清除
        </button>
        

      </div>

      {message && <p role="status">{message}</p>}{error && <p role="alert">{error.message}</p>}<hr />
      <StudyPlanList plans={filteredPlans} onView={(id) => navigate(`/studyplans/${id}`)} />
    </main>
  );
}
