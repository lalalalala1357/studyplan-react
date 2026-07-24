import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import StudyPlanEdit from "../components/StudyPlanEdit";

import {
  deleteStudyPlan,
  getStudyPlanById,
  updateStudyPlan,
} from "../services/studyPlanApi";

import type { StudyPlan } from "../types/studyPlan";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

export default function StudyPlanDetailPage() {
  const { id } = useParams<{ id: string }>();

  const planId = Number(id);
  const navigate = useNavigate();

  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadPlan = useCallback(async () => {
    if (!id || !Number.isInteger(planId)) {
      setError("無效的計畫編號");
      return;
    }

    setError("");

    try {
      const result = await getStudyPlanById(planId);
      setPlan(result);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "讀取失敗"
      );
    }
  }, [id, planId]);

  useEffect(() => {
    void loadPlan();
  }, [loadPlan]);

  async function handleUpdate(
  updatedId: number,
  name: string,
  plannedHours: number,
  actualHours: number,
  abandoned: boolean
) {
  if (!plan) return;

  setMessage("");

  try {
    await updateStudyPlan(
      updatedId,
      name,
      plannedHours,
      actualHours,
      abandoned
    );

    await loadPlan();
    setIsEditing(false);
    setMessage("更新成功");
  } catch (error) {
    setMessage(
      error instanceof Error
        ? error.message
        : "更新失敗"
    );
  }
}

  async function handleDelete() {
    if (!plan) return;

    try {
      setIsDeleting(true);
      setMessage("");

      await deleteStudyPlan(plan.id);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "刪除失敗"
      );

      setIsDeleting(false);
    }
  }

  if (error) {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>讀取失敗</CardTitle>

            <CardDescription>
              無法取得指定的讀書計畫。
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <p
              role="alert"
              className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
            >
              {error}
            </p>

            <Link to="/">
              <Button variant="outline">
                回到列表
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!plan) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          載入中……
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Link to="/">
            <Button variant="ghost">
              ← 回到讀書計畫列表
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardDescription>
                  Study Plan #{plan.id}
                </CardDescription>

                <CardTitle className="mt-2 text-3xl">
                  {plan.planName}
                </CardTitle>
              </div>

              {plan.abandoned ? (
                <Badge variant="destructive">
                  已放棄
                </Badge>
              ) : (
                <Badge variant="secondary">
                  進行中
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-muted/40 p-5">
                <p className="text-sm text-muted-foreground">
                  預計時數
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {plan.plannedHours}
                  <span className="ml-2 text-base font-normal text-muted-foreground">
                    小時
                  </span>
                </p>
              </div>

              <div className="rounded-xl border bg-muted/40 p-5">
                <p className="text-sm text-muted-foreground">
                  實際時數
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {plan.actualHours}
                  <span className="ml-2 text-base font-normal text-muted-foreground">
                    小時
                  </span>
                </p>
              </div>
            </div>

            {message && (
              <p
                role="status"
                className="rounded-md border bg-muted/50 p-3 text-sm"
              >
                {message}
              </p>
            )}

            <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                編輯計畫
              </Button>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    type="button"
                    variant="destructive"
                  >
                    刪除計畫
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      確定要刪除這筆計畫嗎？
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      即將刪除「{plan.planName}」。
                      這個動作無法復原。
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      取消
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={() => void handleDelete()}
                      disabled={isDeleting}
                    >
                      {isDeleting
                        ? "刪除中..."
                        : "確定刪除"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={isEditing}
        onOpenChange={setIsEditing}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>編輯讀書計畫</DialogTitle>

            <DialogDescription>
              修改計畫名稱、預計時數及目前狀態。
            </DialogDescription>
          </DialogHeader>

          <StudyPlanEdit
            plan={plan}
            onUpdate={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}