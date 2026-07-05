import "./HealthCard.css";

function HealthCard({ health }) {
  if (!health) return null;

  return (
    <div className="health-card">

      <div className="health-circle">

        <span className="health-number">
          {Math.round(health.score)}
        </span>

      </div>

      <h2 className="health-title">
        CP Health
      </h2>

      <h3 className="health-grade">
        {health.grade}
      </h3>

      <div className="health-stars">

        ★★★★★

      </div>

      <p className="health-summary">

        {health.summary}

      </p>

    </div>
  );
}

export default HealthCard;