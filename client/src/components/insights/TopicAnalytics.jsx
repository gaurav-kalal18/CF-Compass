import { useId, useState } from "react";
import { formatNumber } from "../../utils/contestFormat";

const sortFields = {
  solved: "Problems solved",
  successRate: "Success rate",
  averageRating: "Average rating",
};

export default function TopicAnalytics({ topics = [] }) {
  const sortId = useId();
  const [sort, setSort] = useState("solved");

  if (!topics.length) return <p className="page-state">No topic performance data yet.</p>;

  const sorted = topics.slice().sort((a, b) => b[sort] - a[sort] || a.topic.localeCompare(b.topic));

  return (
    <>
      <div className="table-toolbar">
        <label htmlFor={sortId}>Sort by</label>
        <select id={sortId} value={sort} onChange={(event) => setSort(event.target.value)}>
          {Object.entries(sortFields).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
      </div>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Topic performance table">
        <table className="data-table">
          <caption className="visually-hidden">Codeforces performance by problem tag</caption>
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col" aria-sort={sort === "solved" ? "descending" : undefined}>Solved</th>
              <th scope="col">Attempted</th>
              <th scope="col" aria-sort={sort === "successRate" ? "descending" : undefined}>Success rate</th>
              <th scope="col" aria-sort={sort === "averageRating" ? "descending" : undefined}>Avg. rating</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((topic) => (
              <tr key={topic.topic}>
                <th scope="row" className="topic-name">{topic.topic}</th>
                <td>{formatNumber(topic.solved)}</td>
                <td>{formatNumber(topic.attempted)}</td>
                <td>{Number.isFinite(topic.successRate) ? topic.successRate.toFixed(1) + "%" : "—"}</td>
                <td>{topic.averageRating > 0 ? formatNumber(Math.round(topic.averageRating)) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
