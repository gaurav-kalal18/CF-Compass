import { useState } from "react";
import { useSearch } from "../context/useSearch";
import ContestTable from "../components/contest/ContestTable";
import HistoryState from "../components/contest/HistoryState";
import PageState from "../components/common/PageState";
import { formatNumber } from "../utils/contestFormat";

const PAGE_SIZE = 20;

function ContestResults({ contests }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = Math.min(visible, contests.length);

  return (
    <section className="content-section">
      <p className="muted">Showing {formatNumber(shown)} of {formatNumber(contests.length)} rated contests.</p>
      <ContestTable contests={contests.slice(-shown).reverse()} />
      {shown < contests.length && (
        <button className="button button--quiet load-more" type="button" onClick={() => setVisible(visible + PAGE_SIZE)}>
          Show older contests
        </button>
      )}
    </section>
  );
}

export default function Contests() {
  const { handle, history, retryHistory } = useSearch();

  return (
    <div className="page-flow secondary-page">
      <h1 className="page-title">Contest history</h1>
      {!handle ? (
        <PageState description="Analyze a Codeforces handle to see contest results and rating changes." />
      ) : history?.contests.length ? (
        <ContestResults key={handle} contests={history.contests} />
      ) : (
        <HistoryState history={history} retry={retryHistory} />
      )}
    </div>
  );
}
