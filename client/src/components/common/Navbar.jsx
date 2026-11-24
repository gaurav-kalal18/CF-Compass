import { Compass } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSearch } from "../../context/useSearch";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { pathname } = useLocation();
  const { handle } = useSearch();

  return (
    <header className="masthead">
      <div className="masthead-inner shell">
        <Link to="/" className="wordmark">
          <Compass size={23} strokeWidth={1.7} aria-hidden="true" />
          CF Compass
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" end>Overview</NavLink>
          <NavLink to="/insights">Insights</NavLink>
          <NavLink to="/practice">Practice</NavLink>
          <NavLink to="/contests">Contests</NavLink>
        </nav>
        {(handle || pathname !== "/") && <SearchBar key={handle} />}
      </div>
    </header>
  );
}
