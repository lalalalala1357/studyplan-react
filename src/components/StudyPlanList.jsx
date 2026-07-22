function StudyPlanList({ plans , onView ,onDelete , onEdit}) {
  if (!plans || plans.length === 0) {
    return <p>目前沒有讀書計畫</p>;
  }

  return (
    <div>
      {plans.map((plan) => (
        <div key={plan.id}>
          <h3>{plan.planName}</h3>
          <p>預計時數：{plan.plannedHours}</p>
          <p>實際時數：{plan.actualHours}</p>
          <p>是否放棄：{plan.abandoned ? "是" : "否"}</p>

          <button onClick={() => onView(plan.id)}>
            查看
          </button>

          <button
            onClick={() => {
                console.log("修改資料:", plan);
                onEdit(plan);
            }}
        >
            修改
        </button>

          <button onClick={() => onDelete(plan.id)}>
            刪除
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default StudyPlanList;