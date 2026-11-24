import { formatNumber } from "../../utils/contestFormat";

export default function DifficultyHeatmap({ difficulty = [] }) {
  if (!difficulty.length) return <p className="page-state">No difficulty data yet.</p>;

  const largestCount = Math.max(1, ...difficulty.map((item) => item.solved));

  return (
    <ul className="difficulty-list">
      {difficulty.map((item) => (
        <li key={item.difficulty}>
          <span>{item.difficulty}</span>
          <span className="difficulty-track" aria-hidden="true">
            <span style={{ width: (item.solved / largestCount) * 100 + "%" }} />
          </span>
          <span>{formatNumber(item.solved)}<span className="visually-hidden"> solved</span></span>
        </li>
      ))}
    </ul>
  );
}
