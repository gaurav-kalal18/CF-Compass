import { useSearch } from "../context/useSearch";
import PracticeRecommendations from "../components/practice/PracticeRecommendations";
import PageState from "../components/common/PageState";

export default function Practice() {
  const { analytics } = useSearch();

  return (
    <div className="page-flow secondary-page">
      <h1 className="page-title">Practice plan</h1>
      {!analytics ? (
        <PageState description="Analyze a Codeforces handle to get topic and difficulty recommendations." />
      ) : (
        <section className="content-section">
          <div className="section-heading"><h2>Recommended topics</h2></div>
          <PracticeRecommendations recommendations={analytics.recommendations} />
        </section>
      )}
    </div>
  );
}
