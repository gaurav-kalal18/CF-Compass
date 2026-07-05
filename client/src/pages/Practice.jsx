import "../styles/dashboard.css";

import { useSearch } from "../context/SearchContext";

import PracticeRecommendations from "../components/practice/PracticeRecommendations";
import WeeklyGoal from "../components/practice/WeeklyGoal";
import LoadingSpinner from "../components/common/LoadingSpinner";
function Practice() {

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

                            🎯 Personalized Practice Plan

                        </h2>

                        <PracticeRecommendations
                            recommendations={analytics.recommendations}
                        />

                    </section>

                    <section className="page-section">

                        <h2 className="section-title">

                            📅 Weekly Goal

                        </h2>

                        <WeeklyGoal />

                    </section>

                </>

            ) : (

                <div className="empty-state">

                    <div className="empty-icon">

                        🎯

                    </div>

                    <h1>

                        Practice Dashboard

                    </h1>

                    <p>

                        Personalized recommendations tailored to your weaknesses.

                    </p>

                    <span>

                        Search a Codeforces handle to receive topic-wise
                        recommendations, suggested difficulty ranges,
                        and a focused weekly practice roadmap.

                    </span>

                </div>

            )}

        </div>

    );

}

export default Practice;