import { useSearch } from "../context/useSearch";
import DifficultyHeatmap from "../components/insights/DifficultyHeatmap";
import TopicAnalytics from "../components/insights/TopicAnalytics";
import PageState from "../components/common/PageState";

export default function Insights() {
  const { analytics } = useSearch();

  return (
    <div className="page-flow secondary-page">
      <h1 className="page-title">Practice insights</h1>
      {!analytics ? (
        <PageState description="Analyze a Codeforces handle to see results by topic and difficulty." />
      ) : (
        <>
          <section className="content-section">
            <div className="section-heading"><h2>Topic performance</h2></div>
            <TopicAnalytics topics={analytics.topicAnalytics} />
          </section>
          <section className="content-section">
            <div className="section-heading"><h2>Problems solved by difficulty</h2></div>
            <DifficultyHeatmap difficulty={analytics.difficultyAnalytics} />
          </section>
        </>
      )}
    </div>
  );
}
