function analyzeDifficulty(problems) {

    const difficulty = new Map();

    problems.forEach((problem) => {

        // Ignore unrated problems
        if (!problem.rating) return;

        if (!difficulty.has(problem.rating)) {

            difficulty.set(problem.rating, {

                difficulty: problem.rating,

                solved: 0,

                attempted: 0,

                totalAttempts: 0,

            });

        }

        const current = difficulty.get(problem.rating);

        current.attempted++;

        current.totalAttempts += problem.attempts;

        if (problem.solved) {

            current.solved++;

        }

    });

    const result = [];

    difficulty.forEach((level) => {

        const successRate =
            level.attempted === 0
                ? 0
                : Number(
                      (
                          (level.solved /
                              level.attempted) *
                          100
                      ).toFixed(2)
                  );

        const averageAttempts =
            level.attempted === 0
                ? 0
                : Number(
                      (
                          level.totalAttempts /
                          level.attempted
                      ).toFixed(2)
                  );

        result.push({

            difficulty: level.difficulty,

            solved: level.solved,

            attempted: level.attempted,

            successRate,

            averageAttempts,

        });

    });

    result.sort(
        (a, b) => a.difficulty - b.difficulty
    );

    return result;

}

module.exports = {
    analyzeDifficulty,
};