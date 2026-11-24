export default function PracticeRecommendations({ recommendations = [] }) {
  if (!recommendations.length) {
    return <p className="page-state">There are no practice recommendations for this profile yet.</p>;
  }

  return (
    <ul className="practice-list">
      {recommendations.map((item) => (
        <li key={item.topic}>
          <div>
            <h3>{item.topic}</h3>
            <p>{item.reason}</p>
          </div>
          <dl className="practice-metrics">
            <div><dt>Estimated impact</dt><dd>{item.estimatedImpact}</dd></div>
            <div><dt>Problem rating</dt><dd>{item.difficultyRange.replace("-", "–")}</dd></div>
            <div><dt>Target</dt><dd>{item.targetProblems} problems</dd></div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
