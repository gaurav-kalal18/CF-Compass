import { Link } from "react-router-dom";
import { useSearch } from "../../context/useSearch";

export default function PageState({ description }) {
  const { loading } = useSearch();

  return (
    <div className="page-state">
      <p>{description}</p>
      {!loading && <Link className="text-link" to="/">Analyze a Codeforces handle</Link>}
    </div>
  );
}
