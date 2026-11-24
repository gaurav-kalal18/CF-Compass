import { useSearch } from "../../context/useSearch";
import PageState from "./PageState";

export default function AnalyticsState({ description }) {
  const { profile, analyticsFailed, retryAnalytics } = useSearch();

  if (!profile) return <PageState description={description} />;

  if (analyticsFailed) {
    return (
      <div className="page-state">
        <p role="alert">Couldn’t load submission analytics.</p>
        <button className="button button--quiet" type="button" onClick={retryAnalytics}>
          Retry analytics
        </button>
      </div>
    );
  }

  return <p className="page-state" role="status">Analyzing Codeforces submissions…</p>;
}
