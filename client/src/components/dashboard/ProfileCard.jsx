import { formatNumber } from "../../utils/contestFormat";

export default function ProfileCard({ profile }) {
  const details = [profile.organization, profile.country].filter(Boolean).join(" · ");
  const items = [
    ["Current rating", profile.rating == null ? "Unrated" : formatNumber(profile.rating)],
    ["Peak rating", profile.maxRating == null ? "—" : formatNumber(profile.maxRating)],
    ["Contribution", profile.contribution == null ? "—" : formatNumber(profile.contribution)],
  ];

  return (
    <div className="profile-strip">
      <div className="profile-identity">
        {profile.avatar && <img className="profile-photo" src={profile.avatar} alt="" />}
        <div>
          <a className="profile-handle" href={"https://codeforces.com/profile/" + encodeURIComponent(profile.handle)}>
            @{profile.handle}
          </a>
          {profile.name && <span className="profile-name">{profile.name}</span>}
          <p className="profile-meta">{[profile.rank ?? "Unrated", details].filter(Boolean).join(" · ")}</p>
        </div>
      </div>
      <dl className="profile-metrics">
        {items.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
