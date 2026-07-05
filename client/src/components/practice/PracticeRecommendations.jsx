import "./PracticeRecommendations.css";

function PracticeRecommendations({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="practice-grid">

      {recommendations.map((item) => (

        <div
          key={item.topic}
          className="practice-card"
        >

          <div className="practice-header">

            <h3>{item.topic}</h3>

            <span className="impact">
              {item.estimatedImpact}
            </span>

          </div>

          <div className="practice-body">

            <p>
              <strong>💡 Reason</strong>
            </p>

            <span>{item.reason}</span>

            <p>
              <strong>📈 Difficulty</strong>
            </p>

            <span>{item.difficultyRange}</span>

            <p>
              <strong>🎯 Target</strong>
            </p>

            <span>
              {item.targetProblems} Problems
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}

export default PracticeRecommendations;