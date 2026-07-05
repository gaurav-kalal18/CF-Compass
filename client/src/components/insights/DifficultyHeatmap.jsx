import "./DifficultyHeatmap.css";

const getColor = (difficulty) => {
  if (difficulty < 1000) return "#4CAF50";
  if (difficulty < 1200) return "#8BC34A";
  if (difficulty < 1400) return "#FFC107";
  if (difficulty < 1600) return "#FF9800";
  return "#F44336";
};

function DifficultyHeatmap({ difficulty }) {
  if (!difficulty || difficulty.length === 0) return null;

  const maxSolved = Math.max(
    ...difficulty.map((item) => item.solved)
  );

  return (
    <div className="heatmap">

      {difficulty.map((item) => {

        const width = (item.solved / maxSolved) * 100;

        return (

          <div
            key={item.difficulty}
            className="heat-row"
          >

            <span className="difficulty-label">

              {item.difficulty}

            </span>

            <div className="bar-container">

              <div
                className="bar"
                style={{
                  width: `${width}%`,
                  backgroundColor: getColor(item.difficulty)
                }}
              />

            </div>

            <span className="difficulty-count">

              {item.solved}

            </span>

          </div>

        );

      })}

    </div>
  );
}

export default DifficultyHeatmap;