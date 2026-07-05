import "../styles/dashboard.css";

import { useSearch } from "../context/SearchContext";

import ContestTable from "../components/contest/ContestTable";
import LoadingSpinner from "../components/common/LoadingSpinner";
function Contests() {

    const { handle, loading } = useSearch();
    if (loading) {

        return <LoadingSpinner />;

    }
    return (

        <div className="dashboard">

            {handle ? (

                <section className="page-section">

                    <h2 className="section-title">

                        🏆 Contest History

                    </h2>

                    <ContestTable
                        handle={handle}
                    />

                </section>

            ) : (

                <div className="empty-state">

                    <div className="empty-icon">
                        🏆
                    </div>

                    <h1>
                        Contest History
                    </h1>

                    <p>
                        Track your competitive programming journey.
                    </p>

                    <span>

                        Search a Codeforces handle to explore your
                        contest performance, rating changes,
                        rankings and recent history.

                    </span>

                </div>

            )}

        </div>

    );

}

export default Contests;