function StudyPlanList({ plans, onView }) {
  if (!plans || plans.length === 0) {
    return <p>目前沒有讀書計畫</p>;
  }

  return (
    <section aria-label="讀書計畫列表">
      {plans.map((plan) => (
        <article key={plan.id}>
          <h3>
            <button type="button" onClick={() => onView(plan.id)}>
              {plan.planName}
            </button>
          </h3>
          <p>預計時數：{plan.plannedHours}</p>
          <p>實際時數：{plan.actualHours}</p>
          <p>是否放棄：{plan.abandoned ? "是" : "否"}</p>
          <hr />
        </article>
      ))}
    </section>
  );
}

export default StudyPlanList;
