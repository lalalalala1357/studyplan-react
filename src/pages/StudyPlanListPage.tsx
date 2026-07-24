import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import StudyPlanForm from "../components/StudyPlanForm";
import StudyPlanList from "../components/StudyPlanList";
import { createStudyPlan, getStudyPlans } from "../services/studyPlanApi";
import { useStudyPlanUiStore } from "../stores/useStudyPlanUiStore";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import 
{
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components/ui/alert";

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
    <main className="mx-auto w-full max-w-[1500px] px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          讀書計畫
        </h1>

        <p className="mt-2 text-muted-foreground">
      管理你的所有讀書計畫
        </p>
      </div>
      <StudyPlanForm onCreate={handleCreate} />
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">
            搜尋讀書計畫
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex gap-3">
            <Input
              id="plan-search"
              type="search"
              placeholder="輸入計畫名稱"
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
            />

            <Button
              type="button"
              variant="outline"
              onClick={clearSearch}
            >
              清除
            </Button>
          </div>
        </CardContent>
      </Card>

      {message && (
        <Alert className="mb-6 border-green-300 bg-green-50">
          <AlertTitle className="text-green-800">
            操作完成
          </AlertTitle>
          <AlertDescription className="text-green-700">
            {message}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>載入失敗</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <StudyPlanList plans={filteredPlans} onView={(id) => navigate(`/studyplans/${id}`)} />
    </main>
  );
}
