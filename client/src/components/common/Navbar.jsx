import { NavLink } from "react-router-dom";

import "./Navbar.css";

import SearchBar from "./SearchBar";

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

        {

          profile && (

            <div className="mini-profile">

              <div>

                <strong>

                  {profile.handle}

                </strong>

              </div>

              <div
                className="mini-rank"
                style={{
                  color:getRankColor(profile.rank)
                }}
              >

                {profile.rank}

              </div>

              <div className="mini-rating">

                {profile.rating}

              </div>

            </div>

          )

        }

        <SearchBar/>

      </div>

    </nav>

  );

}

export default Navbar;