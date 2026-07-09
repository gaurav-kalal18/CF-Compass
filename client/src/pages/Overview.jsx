import "../styles/dashboard.css";

import { useSearch } from "../context/SearchContext";

import ProfileCard from "../components/dashboard/ProfileCard";
import HealthCard from "../components/dashboard/HealthCard";
import QuickStats from "../components/dashboard/QuickStats";
import GrowthAreas from "../components/dashboard/GrowthAreas";
import StrengthAreas from "../components/dashboard/StrengthAreas";

import RatingChart from "../components/charts/RatingChart";
import ContestTable from "../components/contest/ContestTable";

import SearchBar from "../components/common/SearchBar";
import { ChartNoAxesCombined } from "lucide-react";

function Overview() {

    const { profile, analytics, handle } = useSearch();

    return (

        <div className="dashboard">

            {profile && analytics ? (

                <>

                    <div className="hero-section">

                        <ProfileCard profile={profile} />

                        <HealthCard
                            health={analytics.healthScore}
                            weakTopic={analytics.weakTopics?.[0]?.topic}
                        />

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
                        <ChartNoAxesCombined
                            size={56}
                            strokeWidth={2.2}
                        />
                    </div>

                    <h1>
                        Analyze Your Codeforces Journey
                    </h1>

                    <p>
                        Discover your strengths, identify weak topics, and improve with personalized Codeforces analytics.
                    </p>

                    <SearchBar />

                    <div className="feature-chips">

                        <div className="feature-chip">
                            📈 Rating Analytics
                        </div>

                        <div className="feature-chip">
                            🎯 Weak Topic Detection
                        </div>

                        <div className="feature-chip">
                            📃 Contest History
                        </div>

                    </div>

                    <span className="empty-footer-text">
                        • No sign-up required  • Analyze any public Codeforces handle
                    </span>

                </div>

            )}

        </div>

    );

}

export default Overview;