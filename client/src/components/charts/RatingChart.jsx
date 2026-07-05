import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import API from "../../services/api";
import "./RatingChart.css";

function RatingChart({ handle }) {
  const [ratingHistory, setRatingHistory] = useState([]);

  async function loadRatings() {
    try {
      const response = await API.get(`/profile/rating/${handle}`);

      const chartData = response.data.map((contest) => ({
        contest: contest.contestName,
        rating: contest.newRating,
      }));

      setRatingHistory(chartData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (handle) {
      loadRatings();
    }
  }, [handle]);

  if (!handle) return null;

  return (
    <div className="chart-card">

      <h2 className="chart-title">
        📈 Rating Progress
      </h2>

      <ResponsiveContainer width="100%" height={400}>

        <LineChart data={ratingHistory}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="contest"
            hide
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="rating"
            stroke="#4CAF50"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default RatingChart;