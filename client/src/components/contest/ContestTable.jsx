import { useEffect, useState } from "react";
import API from "../../services/api";
import "./ContestTable.css";

function ContestTable({ handle }) {

  const [history, setHistory] = useState([]);

  async function loadHistory() {

    try {

      const response = await API.get(`/profile/rating/${handle}`);

      setHistory(response.data);

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {

    if (handle) {

      loadHistory();

    }

  }, [handle]);

  if (!handle) return null;

  return (

    <div className="contest-card">

      <table className="contest-table">

        <thead>

          <tr>

            <th>Contest</th>

            <th>Rank</th>

            <th>Old</th>

            <th>New</th>

            <th>Δ Rating</th>

          </tr>

        </thead>

        <tbody>

          {history
            .slice()
            .reverse()
            .slice(0, 10)
            .map((contest) => {

              const delta =
                contest.newRating - contest.oldRating;

              return (

                <tr key={contest.contestId}>

                  <td className="contest-name">
                    {contest.contestName}
                  </td>

                  <td>{contest.rank}</td>

                  <td>{contest.oldRating}</td>

                  <td>{contest.newRating}</td>

                  <td
                    className={
                      delta > 0
                        ? "positive"
                        : delta < 0
                        ? "negative"
                        : "neutral"
                    }
                  >

                    {delta > 0 ? "+" : ""}
                    {delta}

                  </td>

                </tr>

              );

            })}

        </tbody>

      </table>

    </div>

  );

}

export default ContestTable;