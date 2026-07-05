import "./StrengthAreas.css";

function StrengthAreas({ strengths }) {

  if (!strengths || strengths.length === 0) return null;

  return (

    <div className="areas-section">

      <h2>🏆 Your Strengths</h2>

      <div className="areas-grid">

        {strengths.slice(0, 3).map((topic) => (

          <div
            key={topic.topic}
            className="area-card strength"
          >

            <h3>{topic.topic}</h3>

            <p>
              Strength Score
            </p>

            <span className="big-number">
              {Math.round(topic.strengthScore)}
            </span>

            <div className="stats-list">

              <div className="stat-row">

                <span>Success Rate</span>

                <strong>{topic.factors.successRate}%</strong>

              </div>

              <div className="stat-row">

                <span>Solved</span>

                <strong>{topic.factors.solved}</strong>

              </div>

              <div className="stat-row">

                <span>Avg Attempts</span>

                <strong>{topic.factors.averageAttempts}</strong>

              </div>

              <div className="stat-row">

                <span>Avg Rating</span>

                <strong>{Math.round(topic.factors.averageRating)}</strong>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default StrengthAreas;