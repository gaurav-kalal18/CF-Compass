import { Link } from "react-router-dom";

export default function TopicHighlights({ title, topics = [], strength = false }) {
  if (!topics.length) return null;

  return (
    <section className="summary-block">
      <h2>{title}</h2>
      <ul className="topic-summary">
        {topics.slice(0, 3).map((item) => (
          <li key={item.topic}>
            <strong>{item.topic}</strong>
            <span>{strength ? item.factors.solved + " solved" : item.level} · {item.factors.successRate}% success</span>
          </li>
        ))}
      </ul>
      <Link className="text-link" to={strength ? "/insights" : "/practice"}>
        {strength ? "Explore insights" : "View practice plan"}
      </Link>
    </section>
  );
}
