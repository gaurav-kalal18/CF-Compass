import { deltaClass, formatContestDate, formatDelta, formatNumber } from "../../utils/contestFormat";

export default function ContestTable({ contests }) {
  return (
    <div className="table-scroll" tabIndex={0} role="region" aria-label="Contest results table">
      <table className="data-table">
        <caption className="visually-hidden">Rated Codeforces contest results, newest first</caption>
        <thead>
          <tr>
            <th scope="col">Contest</th>
            <th scope="col">Rank</th>
            <th scope="col">Old rating</th>
            <th scope="col">New rating</th>
            <th scope="col">Change</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest) => {
            const delta = contest.newRating - contest.oldRating;
            return (
              <tr key={contest.contestId}>
                <th scope="row">
                  <a href={"https://codeforces.com/contest/" + contest.contestId}>{contest.contestName}</a>
                  <span className="table-date">{formatContestDate(contest.ratingUpdateTimeSeconds)}</span>
                </th>
                <td>{formatNumber(contest.rank)}</td>
                <td>{formatNumber(contest.oldRating)}</td>
                <td>{formatNumber(contest.newRating)}</td>
                <td className={deltaClass(delta)}>{formatDelta(delta)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
