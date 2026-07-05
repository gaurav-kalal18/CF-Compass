function analyzeTopics(problems) {
    const topics = new Map();

    problems.forEach((problem) => {

        problem.tags.forEach((tag) => {

            if (!topics.has(tag)) {

                topics.set(tag, {
                    topic: tag,

                    solved: 0,

                    attempted: 0,

                    totalAttempts: 0,

                    totalSolvedRating: 0,
                });

            }

            const current = topics.get(tag);

            current.attempted++;

            current.totalAttempts += problem.attempts;

            if (problem.solved) {

                current.solved++;

                current.totalSolvedRating += problem.rating;

            }

        });

    });

    const result = [];

    topics.forEach((topic) => {

        const successRate =
            topic.attempted === 0
                ? 0
                : Number(
                      (
                          (topic.solved / topic.attempted) *
                          100
                      ).toFixed(2)
                  );

        const averageRating =
            topic.solved === 0
                ? 0
                : Math.round(
                      topic.totalSolvedRating /
                          topic.solved
                  );

        const failedAttempts =
            topic.totalAttempts - topic.solved;

        const averageAttempts =
    topic.attempted === 0
        ? 0
        : Number(
              (
                  topic.totalAttempts /
                  topic.attempted
              ).toFixed(2)
          );

      result.push({
    topic: topic.topic,

    solved: topic.solved,

    attempted: topic.attempted,

    successRate,

    averageRating,

    totalAttempts: topic.totalAttempts,

    averageAttempts,

    failedAttempts,
});

    });

    result.sort(
        (a, b) => b.attempted - a.attempted
    );

    return result;
}

module.exports = {
    analyzeTopics,
};