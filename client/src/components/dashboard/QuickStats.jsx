import "./QuickStats.css";
import StatsCard from "../StatsCard";

function QuickStats({ profile }) {
  if (!profile) return null;

  return (
    <div className="quick-stats">

      <StatsCard
        title="Current Rating"
        value={profile.rating}
      />

      <StatsCard
        title="Max Rating"
        value={profile.maxRating}
      />

      <StatsCard
        title="Current Rank"
        value={profile.rank}
      />

      <StatsCard
        title="Contribution ⭐"
        value={profile.contribution}
      />

    </div>
  );
}

export default QuickStats;