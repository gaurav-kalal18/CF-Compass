import "./TopicAnalytics.css";

function TopicAnalytics({ topics }) {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="topic-grid">

      {topics.map((topic) => (

        <div
          key={topic.topic}
          className="topic-card"
        >

          <h3>{topic.topic}</h3>

          <p>
            Solved
          </p>

          <span className="topic-value">
            {topic.solved}
          </span>

          <p>
            Success Rate
          </p>

          <span className="topic-success">
            {topic.successRate.toFixed(1)}%
          </span>

          <p>
            Average Rating
          </p>

          <span className="topic-rating">
            {Math.round(topic.averageRating)}
          </span>

        </div>

      ))}

    </div>
  );
}

export default TopicAnalytics;