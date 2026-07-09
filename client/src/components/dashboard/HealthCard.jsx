import "./HealthCard.css";

function getHealthLabel(score) {

  if (score >= 90) return "Elite";

  if (score >= 80) return "Excellent";

  if (score >= 70) return "Very Good";

  if (score >= 60) return "Good";

  if (score >= 40) return "Fair";

  return "Needs Improvement";
}

function HealthCard({ health, weakTopic }) {

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

      <h3 className="health-label">
        {getHealthLabel(health.score)}
      </h3>

      <div className="health-metrics">

        <span>📈 Rating</span>

        <span>•</span>

        <span>🎯 Accuracy</span>

        <span>•</span>

        <span>📚 Coverage</span>

      </div>

      <p className="health-focus">

        <strong>Needs Attention:</strong> {weakTopic
          ? weakTopic.charAt(0).toUpperCase() + weakTopic.slice(1)
          : "N/A"}

      </p>

      <p className="health-summary">

        {health.summary}

      </p>

    </div>

  );
}

export default HealthCard;