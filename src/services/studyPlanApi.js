//共同網址
const API_URL = "http://localhost:5273/api/study-plans";

//Get全部資料 false丟錯誤 成功轉javascript
export async function getStudyPlans() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("取得資料失敗");
  }

  return await response.json();
}

//GetById
export async function getStudyPlanById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("查詢失敗");
  }

  return await response.json();
}

//create
//Content-Type告訴後端內容是 JSON  JSON.stringify()把 JavaScript 物件轉成 JSON 字串
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

//Delete
export async function deleteStudyPlan(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("刪除失敗");
  }
}

//Update
//JSON.stringify()修改內容轉成JSON false是修改失敗
export async function updateStudyPlan(
  id,
  planName,
  plannedHours,
  actualHours,
  abandoned,
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      planName,
      plannedHours,
      actualHours,
      abandoned,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "修改失敗");
  }

  return;
}
