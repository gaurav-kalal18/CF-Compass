import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ReferenceArea,
  ReferenceDot,
} from "recharts";

import API from "../../services/api";
import "./RatingChart.css";

function CustomTooltip({ active, payload, label }) {

  if (!active || !payload || !payload.length) return null;

  return (
    <div className="custom-tooltip">

      <h4>{label}</h4>

      <div className="tooltip-rating">

        <span>Rating</span>

        <strong>{payload[0].value}</strong>

      </div>

    </div>
  );
}

function RatingChart({ handle }) {

  const [ratingHistory, setRatingHistory] = useState([]);
  const [peakPoint, setPeakPoint] = useState(null);


  async function loadRatings() {

    try {

      const response = await API.get(`/profile/rating/${handle}`);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.result || [];
      const chartData = data.map((contest) => ({
        contest: contest.contestName,
        rating: contest.newRating,
        delta: contest.newRating - contest.oldRating,
      }));

      const peakContest = chartData.reduce((best, current) =>
        current.rating > best.rating ? current : best
      );
      setRatingHistory(chartData);
      setPeakPoint(peakContest);

    } catch (error) {

      console.error(error);

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

      <ResponsiveContainer
        width="100%"
        height={420}
      >

        <LineChart
          data={ratingHistory}
          margin={{
            top: 10,
            right: 20,
            left: 5,
            bottom: 5,
          }}
        >

          <defs>

            <linearGradient
              id="ratingFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#4CAF50"
                stopOpacity={0.35}
              />

              <stop
                offset="95%"
                stopColor="#4CAF50"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>
          {/* Newbie */}
          <ReferenceArea
            y1={0}
            y2={1200}
            fill="#808080"
            fillOpacity={0.08}
          />

          {/* Pupil */}
          <ReferenceArea
            y1={1200}
            y2={1400}
            fill="#008000"
            fillOpacity={0.08}
          />

          {/* Specialist */}
          <ReferenceArea
            y1={1400}
            y2={1600}
            fill="#03A89E"
            fillOpacity={0.08}
          />

          {/* Expert */}
          <ReferenceArea
            y1={1600}
            y2={1900}
            fill="#0000FF"
            fillOpacity={0.08}
          />

          {/* Candidate Master */}
          <ReferenceArea
            y1={1900}
            y2={2100}
            fill="#AA00AA"
            fillOpacity={0.08}
          />

          {/* Master */}
          <ReferenceArea
            y1={2100}
            y2={2400}
            fill="#FF8C00"
            fillOpacity={0.08}
          />
          <CartesianGrid
            strokeDasharray="5 5"
            opacity={0.18}
          />

          <XAxis
            dataKey="contest"
            hide
          />

          <YAxis
            domain={[
              (min) => Math.max(0, min - 100),
              (max) => max + 80,
            ]}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#ffffff55",
              strokeWidth: 1,
            }}
          />

          <Area
            type="monotone"
            dataKey="rating"
            stroke="none"
            fill="url(#ratingFill)"
          />

          {peakPoint && (
            <ReferenceDot
              x={peakPoint.contest}
              y={peakPoint.rating}
              r={0}
              ifOverflow="extendDomain"
              label={{
                value: "🏆 Peak",
                position: "top",
                fill: "#FFC107",
                fontSize: 13,
                fontWeight: 700,
                offset: 15,
              }}
            />
          )}

          <Line
            type="monotone"
            dataKey="rating"
            stroke="#4CAF50"
            strokeWidth={4}
            dot={(props) => {

              const { cx, cy, payload } = props;

              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={3.5}
                  fill={
                    payload.delta > 0
                      ? "#4CAF50"
                      : payload.delta < 0
                        ? "#ef4444"
                        : "#ffffff"
                  }
                  stroke="#ffffff"
                  strokeWidth={1.2}
                />
              );

            }}
            activeDot={{
              r: 7,
              fill: "#ffffff",
              stroke: "#4CAF50",
              strokeWidth: 3,
            }}
            animationDuration={1800}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default RatingChart;