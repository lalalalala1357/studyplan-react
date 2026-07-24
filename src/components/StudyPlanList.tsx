import type { StudyPlan } from "../types/studyPlan";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import
{
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Props
{
  plans : StudyPlan[];
  onView : (id : number) => void;
}

export default function StudyPlanList({
  plans,
  onView,
}:Props)
{
  if(plans.length ===0)
  {
    return(
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-14 text-center">
          <div className="mb-4 text-4xl">📚</div>
          <h3 className="text-lg font-semibold">
            目前沒有讀書計畫
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            請先新增一筆讀書計畫
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section
      aria-label="讀書計畫列表"
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Study Plan #{plan.id}
                </p>

                <CardTitle className="mt-2 truncate text-xl">
                  {plan.planName}
                </CardTitle>
              </div>

              <Badge
                variant={
                  plan.abandoned
                    ? "destructive"
                    : "secondary"
                }
              >
                {plan.abandoned ? "已放棄" : "進行中"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border bg-muted/40 p-4">
                <p className="text-xs text-muted-foreground">
                  預計時數
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  {plan.plannedHours}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    小時
                  </span>
                </p>
              </div>

              <div className="rounded-lg border bg-muted/40 p-4">
                <p className="text-xs text-muted-foreground">
                  實際時數
                </p>

                <p className="mt-1 text-2xl font-semibold">
                  {plan.actualHours}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    小時
                  </span>
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onView(plan.id)}
            >
              查看詳細資料
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}