export default function HealthCard({ health, hasTopics }) {
  if (!health) return null;

  return (
    <section className="summary-block">
      <h2>CP Health</h2>
      {hasTopics ? (
        <>
          <p className="health-score">{Math.round(health.score)} <span>/ 100 · Grade {health.grade}</span></p>
          <p>{health.summary}</p>
        </>
      ) : <p>There’s no topic data to score yet.</p>}
    </section>
  );
}
