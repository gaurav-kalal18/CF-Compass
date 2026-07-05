import "./WeeklyGoal.css";

function WeeklyGoal() {

  return (

    <div className="goal-card">

      <h2>📈 Weekly Goal</h2>

      <progress
        value="3"
        max="10"
      />

      <p>3 / 10 Problems</p>

    </div>

  );

}

export default WeeklyGoal;