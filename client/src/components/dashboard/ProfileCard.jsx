import "./ProfileCard.css";
import { getRankColor } from "../../utils/rankColors";

function ProfileCard({ profile }) {

  if (!profile) return null;

  const rankColor = getRankColor(profile.rank);

  return (

    <div className="profile-card">

      <img
        src={profile.avatar}
        alt={profile.handle}
        className="profile-avatar"
      />

      <h2>
        {profile.name || profile.handle}
      </h2>

      <p className="handle">
        @{profile.handle}
      </p>

      {profile.rank && (

        <span
          className="rank-badge"
          style={{ backgroundColor: rankColor }}
        >
          {
            profile.rank
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          }
        </span>

      )}

      <div className="rating-row">

        <div className="rating-item">

          <div className="rating-left">

            <div className="rating-dot current"></div>

            <h3>
              {profile.rating}
            </h3>

          </div>

          <span>
            Current Rating
          </span>

        </div>

        <div className="rating-item">

          <div className="rating-left">

            <div className="rating-dot peak"></div>

            <h3>
              {profile.maxRating}
            </h3>

          </div>

          <span>
            Max Rating
          </span>

        </div>

      </div>

      <hr className="profile-divider" />

      <div className="profile-details">

        {profile.country && (

          <p className="info">
            🌍 {profile.country}
          </p>

        )}

        {profile.organization && (

          <p className="info">
            🏫 {profile.organization}
          </p>

        )}

      </div>

    </div>

  );

}

export default ProfileCard;