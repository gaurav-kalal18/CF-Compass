import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="loading-container">

      <div className="spinner"></div>

      <h2>Loading Profile...</h2>

      <p>
        Fetching analytics from Codeforces
      </p>

    </div>
  );
}

export default LoadingSpinner;