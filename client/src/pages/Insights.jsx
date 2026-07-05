import "../styles/dashboard.css";

import { useSearch } from "../context/SearchContext";

import TopicAnalytics from "../components/insights/TopicAnalytics";
import DifficultyHeatmap from "../components/insights/DifficultyHeatmap";
import LoadingSpinner from "../components/common/LoadingSpinner";




function Insights() {

    const { analytics, loading } = useSearch();
    if (loading) {

        return <LoadingSpinner />;

    }
    return (

        <div className="dashboard">

            {analytics ? (

                <>

                    <section className="page-section">

                        <h2 className="section-title">
                            🎯 Difficulty Distribution
                        </h2>

                        <DifficultyHeatmap
                            difficulty={analytics.difficultyAnalytics}
                        />

                    </section>

                    <section className="page-section">

                        <h2 className="section-title">
                            📊 Topic Analytics
                        </h2>

                        <TopicAnalytics
                            topics={analytics.topicAnalytics}
                        />

                    </section>

                </>

            ) : (

                <div className="empty-state">

                    <div className="empty-icon">
                        📊
                    </div>

                    <h1>
                        Insights Dashboard
                    </h1>

                    <p>
                        Discover your strongest and weakest topics.
                    </p>

                    <span>

                        Search a Codeforces handle to unlock detailed
                        topic-wise performance analysis and difficulty
                        distribution.

                    </span>

                </div>

            )}

        </div>

    );

}

export default Insights;