const API_URL = "http://localhost:5273/api/study-plans";

export async function getStudyPlans() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("取得資料失敗");
  }

  return await response.json();
}

export async function getStudyPlanById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("查詢失敗");
  }

  return await response.json();
}

export async function createStudyPlan(planName, plannedHours) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      planName,
      plannedHours,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "新增失敗");
  }

  return await response.json();
}

export async function deleteStudyPlan(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("刪除失敗");
  }
}

export async function updateStudyPlan(id, planName, plannedHours) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      planName,
      plannedHours,
      actualHours: 0,
      abandoned: false,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "修改失敗");
  }

  return;
}
