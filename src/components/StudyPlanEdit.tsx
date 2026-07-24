import { useState, type FormEvent } from "react";
import type { StudyPlan } from "../types/studyPlan";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  plan: StudyPlan;
  onUpdate: (
    id: number,
    name: string,
    plannedHours: number,
    actualHours:number,
    abandoned: boolean
  ) => Promise<void>;
  onCancel: () => void;
}

export default function StudyPlanEdit({
  plan,
  onUpdate,
  onCancel,
}: Props) {
  const [planName, setPlanName] = useState(plan.planName);
  const [plannedHours, setPlannedHours] = useState(
    String(plan.plannedHours)
  );
  const [actualHours, setActualHours] = useState(
    String(plan.actualHours)
  );
  const [abandoned, setAbandoned] = useState(plan.abandoned);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      await onUpdate(
        plan.id,
        planName.trim(),
        Number(plannedHours),
        Number(actualHours),
        abandoned
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5"
    >
      <div className="grid gap-2">
        <Label htmlFor="edit-plan-name">
          計畫名稱
        </Label>

        <Input
          id="edit-plan-name"
          value={planName}
          onChange={(event) =>
            setPlanName(event.target.value)
          }
          placeholder="請輸入計畫名稱"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="edit-planned-hours">
          預計時數
        </Label>

        <Input
          id="edit-planned-hours"
          type="number"
          min="0"
          value={plannedHours}
          onChange={(event) =>
            setPlannedHours(event.target.value)
          }
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="edit-actual-hours">
          實際時數
        </Label>

        <Input
          id="edit-actual-hours"
          type="number"
          min="0"
          value={actualHours}
          onChange={(event) =>
            setActualHours(event.target.value)
          }
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="edit-abandoned">
          計畫狀態
        </Label>

        <Select
          value={String(abandoned)}
          onValueChange={(value) =>
            setAbandoned(value === "true")
          }
        >
          <SelectTrigger id="edit-abandoned" className="w-full">
            <SelectValue placeholder="請選擇計畫狀態" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="false">進行中</SelectItem>
            <SelectItem value="true">已放棄</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          取消
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "儲存中..." : "儲存修改"}
        </Button>
      </div>
    </form>
  );
}