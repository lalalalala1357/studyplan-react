import { useState, type FormEvent } from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  onCreate: (
    planName: string,
    plannedHours: number
  ) => Promise<boolean>;
}

export default function StudyPlanForm({ onCreate }: Props) {
  const [planName, setPlanName] = useState("");
  const [plannedHours, setPlannedHours] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      const isCreated = await onCreate(
        planName.trim(),
        Number(plannedHours)
      );

      if (isCreated) {
        setPlanName("");
        setPlannedHours("");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>新增讀書計畫</CardTitle>

        <CardDescription>
          填寫計畫名稱與預計完成時數。
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid gap-5 md:grid-cols-[1fr_180px_auto] md:items-end"
        >
          <div className="grid gap-2">
            <Label htmlFor="plan-name">
              計畫名稱
            </Label>

            <Input
              id="plan-name"
              value={planName}
              onChange={(event) =>
                setPlanName(event.target.value)
              }
              placeholder="例如：React 基礎學習"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="planned-hours">
              預計時數
            </Label>

            <Input
              id="planned-hours"
              type="number"
              min="0"
              value={plannedHours}
              onChange={(event) =>
                setPlannedHours(event.target.value)
              }
              placeholder="0"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "新增中..." : "新增計畫"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}