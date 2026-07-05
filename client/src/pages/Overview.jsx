import "../styles/dashboard.css";

import { useSearch } from "../context/SearchContext";

import ProfileCard from "../components/dashboard/ProfileCard";
import HealthCard from "../components/dashboard/HealthCard";
import QuickStats from "../components/dashboard/QuickStats";
import GrowthAreas from "../components/dashboard/GrowthAreas";
import StrengthAreas from "../components/dashboard/StrengthAreas";

import RatingChart from "../components/charts/RatingChart";
import ContestTable from "../components/contest/ContestTable";
import LoadingSpinner from "../components/common/LoadingSpinner";
function Overview() {

    const { profile, analytics, handle, loading } = useSearch();
    if (loading) {

        return <LoadingSpinner />;

    }
    return (

        <div className="dashboard">

            {profile && analytics ? (

                <>

                    <div className="hero-section">

                        <ProfileCard profile={profile} />

                        <HealthCard health={analytics.healthScore} />

                    </div>

                    <QuickStats profile={profile} />

                    <GrowthAreas
                        focusAreas={analytics.weakTopics}
                    />

                    <StrengthAreas
                        strengths={analytics.strongTopics}
                    />

                    <RatingChart
                        handle={handle}
                    />

                    <ContestTable
                        handle={handle}
                    />

                </>

            ) : (

                <div className="empty-state">

                    <div className="empty-icon">
                        🧭
                    </div>

                    <h1>
                        Welcome to CF Compass
                    </h1>

                    <p>
                        Your Personal Codeforces Analytics Dashboard
                    </p>

                    <span>
                        Search a Codeforces handle from the navigation bar
                        to unlock personalized insights, contest analytics,
                        practice recommendations and performance tracking.
                    </span>

                </div>

            )}

        </div>

    );

}

export default Overview;