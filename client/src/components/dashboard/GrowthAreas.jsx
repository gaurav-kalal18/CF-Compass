import "./GrowthAreas.css";

function GrowthAreas({ focusAreas }) {
    if (!focusAreas || focusAreas.length === 0) return null;

    return (
        <div className="areas-section">

            <h2>🎯 Focus Next</h2>

            <div className="areas-grid">

                {focusAreas.slice(0, 3).map((topic) => (

                    <div
                        key={topic.topic}
                        className="area-card growth"
                    >

                        <h3>{topic.topic}</h3>

                        <p>
                            Priority
                        </p>

                        <span className="big-number">
                            {Math.round(topic.weaknessScore)}
                        </span>

                        <p>
                            Level
                        </p>

                        <strong>{topic.level}</strong>

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

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default GrowthAreas;