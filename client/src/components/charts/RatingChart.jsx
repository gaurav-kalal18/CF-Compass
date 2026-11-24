import { useEffect, useId, useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceDot, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { deltaClass, formatContestDate, formatDelta, formatNumber } from "../../utils/contestFormat";

const REPLAY_ROUNDS = 12;

function useContestReplay(lastIndex) {
  const [selection, setSelection] = useState(null);
  const [playing, setPlaying] = useState(false);
  const index = selection ?? lastIndex;

  function select(next) {
    setPlaying(false);
    setSelection(next);
  }

  function toggle() {
    if (playing) {
      setPlaying(false);
      return;
    }

    if (index === lastIndex) setSelection(Math.max(0, lastIndex - REPLAY_ROUNDS + 1));
    setPlaying(true);
  }

  return { index, playing, select, toggle, setSelection, setPlaying };
}

export default function RatingChart({ contests }) {
  const sliderId = useId();
  const lastIndex = contests.length - 1;
  const replay = useContestReplay(lastIndex);
  const { index, playing, select, toggle, setSelection, setPlaying } = replay;
  useEffect(() => {
    if (!playing) return;

    const timer = window.setTimeout(() => {
      const next = Math.min(index + 1, lastIndex);
      setSelection(next);
      if (next === lastIndex) setPlaying(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [index, lastIndex, playing, setPlaying, setSelection]);

  const contest = contests[index];
  const delta = contest.newRating - contest.oldRating;
  const firstDate = formatContestDate(contests[0].ratingUpdateTimeSeconds);
  const lastDate = formatContestDate(contests[lastIndex].ratingUpdateTimeSeconds);
  const date = formatContestDate(contest.ratingUpdateTimeSeconds);

  const ratingDomain = lastIndex === 0
    ? [Math.floor(contest.newRating / 50) * 50 - 50, Math.ceil(contest.newRating / 50) * 50 + 50]
    : ["auto", "auto"];
  const points = useMemo(
    () => contests.map(({ newRating }, position) => ({ position, rating: newRating })),
    [contests]
  );
  const peak = useMemo(
    () => points.reduce((best, point) => point.rating >= best.rating ? point : best),
    [points]
  );
  const traced = useMemo(
    () => points.map((point) => ({ ...point, playedRating: point.position <= index ? point.rating : null })),
    [points, index]
  );

  return (
    <div className="replay">
      <div className="replay-layout">
        <div className="replay-visual">
          <div className="replay-heading">
            <h1>Contest replay</h1>
            <p><strong>Rating history</strong> · {firstDate === lastDate ? firstDate : firstDate + " – " + lastDate}</p>
          </div>
          <div className="replay-chart" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart data={traced} margin={{ top: 12, right: 12, bottom: 10, left: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--grid)" />
                <XAxis type="number" dataKey="position" domain={[0, Math.max(1, lastIndex)]} hide />
                <YAxis type="number" domain={ratingDomain} tickCount={5} allowDecimals={false} width={48} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} axisLine={false} />
                <Line type="linear" dataKey="rating" stroke="var(--rule)" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="linear" dataKey="playedRating" stroke="var(--accent)" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                {lastIndex > 0 && (
                  <ReferenceDot
                    x={peak.position}
                    y={peak.rating}
                    r={3}
                    fill="var(--muted)"
                    stroke="var(--paper)"
                    label={{
                      value: "Peak",
                      position: peak.position === 0 ? "right" : "left",
                      fill: "var(--muted)",
                      fontSize: 12,
                    }}
                  />
                )}
                <ReferenceDot className="replay-marker" x={index} y={contest.newRating} r={5} fill="var(--accent)" stroke="var(--paper)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <section className="replay-event" aria-label="Selected contest" aria-live={playing ? "off" : "polite"}>
          <div className="replay-event-content" key={contest.contestId}>
            <p className="muted">{date}</p>
            <h2>{contest.contestName}</h2>
            <p className={"rating-change " + deltaClass(delta)}>{formatDelta(delta)}</p>
            <p className="muted">Rating change</p>
            <dl className="event-metrics">
              <div><dt>Contest rank</dt><dd>{formatNumber(contest.rank)}</dd></div>
              <div><dt>New rating</dt><dd>{formatNumber(contest.newRating)}</dd></div>
            </dl>
          </div>
        </section>
      </div>
      <div className="replay-controls">
        {lastIndex > 0 && (
          <>
            <button className="button" type="button" onClick={toggle}>{playing ? "Pause" : index === lastIndex ? "Replay" : "Play"}</button>
            <div className="replay-scrub">
              <label className="visually-hidden" htmlFor={sliderId}>Contest position</label>
              <input
                type="range"
                id={sliderId}
                min={0}
                max={lastIndex}
                value={index}
                aria-valuetext={(index + 1) + " of " + contests.length + ", " + contest.contestName + ", rating " + contest.newRating}
                onChange={(event) => select(Number(event.target.value))}
              />
              <div className="replay-dates"><span>{firstDate}</span><span>{lastDate}</span></div>
            </div>
          </>
        )}
        <p className="replay-count">{formatNumber(index + 1)} / {formatNumber(contests.length)} {contests.length === 1 ? "contest" : "contests"}</p>
      </div>
    </div>
  );
}
