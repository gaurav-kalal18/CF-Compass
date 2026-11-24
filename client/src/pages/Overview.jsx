import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../context/useSearch";
import SearchBar from "../components/common/SearchBar";
import ProfileCard from "../components/dashboard/ProfileCard";
import HealthCard from "../components/dashboard/HealthCard";
import TopicHighlights from "../components/dashboard/TopicHighlights";
import ContestTable from "../components/contest/ContestTable";
import HistoryState from "../components/contest/HistoryState";

const RatingChart = lazy(() => import("../components/charts/RatingChart"));

export default function Overview() {
  const { profile, analytics, history, retryHistory } = useSearch();

  if (!profile) {
    return (
      <section className="entry">
        <div className="entry-main">
          <h1>See which contests moved your rating.</h1>
          <p>Replay your Codeforces contests, see where you’re improving, and find what to practice next.</p>
          <SearchBar prominent />
        </div>
        <dl className="entry-index">
          <div><dt>Contest replay</dt><dd>Follow the rounds that changed your rating.</dd></div>
          <div><dt>Topic insights</dt><dd>Compare results across tags and difficulty levels.</dd></div>
          <div><dt>Practice plan</dt><dd>Pick a focus topic and a difficulty range.</dd></div>
        </dl>
      </section>
    );
  }

  const contests = history?.contests ?? [];

  return (
    <div className="page-flow">
      <ProfileCard profile={profile} />
      {contests.length > 0 ? (
        <Suspense fallback={<p className="page-state replay-placeholder" role="status">Preparing contest replay…</p>}>
          <RatingChart key={profile.handle} contests={contests} />
        </Suspense>
      ) : (
        <section>
          <h1 className="page-title">Contest replay</h1>
          <HistoryState history={history} retry={retryHistory} />
        </section>
      )}
      <div className="overview-summary">
        <TopicHighlights title="Practice next" topics={analytics.weakTopics} />
        <TopicHighlights title="Strong topics" topics={analytics.strongTopics} strength />
        <HealthCard health={analytics.healthScore} hasTopics={Boolean(analytics.topicAnalytics?.length)} />
      </div>
      {contests.length > 0 && (
        <section className="content-section">
          <div className="section-heading">
            <h2>Recent contests</h2>
            <Link className="text-link" to="/contests">View contest history</Link>
          </div>
          <ContestTable contests={contests.slice(-10).reverse()} />
        </section>
      )}
    </div>
  );
}
