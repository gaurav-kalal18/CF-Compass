import { NavLink } from "react-router-dom";

import "./Navbar.css";

import { useSearch } from "../../context/SearchContext";
import { getRankColor } from "../../utils/rankColors";

function Navbar() {

  const { profile } = useSearch();

  return (

    <nav className="navbar">

      <div className="logo">

        🧭 CF Compass

      </div>

      <div className="nav-center">

        <NavLink to="/">Overview</NavLink>

        <NavLink to="/insights">Insights</NavLink>

        <NavLink to="/practice">Practice</NavLink>

        <NavLink to="/contests">Contests</NavLink>

      </div>

      <div className="nav-right">

        {profile ? (

          <div className="mini-profile">

            <div className="mini-handle">

              👤 {profile.handle}

            </div>

            <div className="mini-info">

              <span
                className="mini-rank"
                style={{
                  color: getRankColor(profile.rank),
                }}
              >
                {profile.rank.charAt(0).toUpperCase() + profile.rank.slice(1)}
              </span>

              <span className="info-separator">
                •
              </span>

              <span className="mini-rating">

                Rating {profile.rating}

              </span>

            </div>

          </div>

        ) : (

          <div className="ready-status">

            <span className="status-dot"></span>

            <span>

              Online

            </span>

          </div>

        )}

      </div>

    </nav>

  );

}

export default Navbar;