export default function HistoryState({ history, retry }) {
  if (!history) return <p className="page-state" role="status">Loading rated contests…</p>;
  if (history.failed) {
    return (
      <div className="page-state">
        <p role="alert">Couldn’t load contest history.</p>
        <button className="button button--quiet" type="button" onClick={retry}>Retry contest history</button>
      </div>
    );
  }

  return <p className="page-state">No rated contests yet.</p>;
}
