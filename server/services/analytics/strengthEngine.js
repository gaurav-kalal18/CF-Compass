function calculateStrengths(topicAnalytics) {

    if (topicAnalytics.length === 0) {
        return [];
    }

    const maxSolved = Math.max(
        ...topicAnalytics.map(topic => topic.solved)
    );

    const maxAverageAttempts = Math.max(
        ...topicAnalytics.map(topic => topic.averageAttempts)
    );

    const maxAverageRating = Math.max(
        ...topicAnalytics.map(topic => topic.averageRating)
    );

    const strengths = topicAnalytics.map(topic => {

        const successComponent =
            topic.successRate;

        const solvedComponent =
            maxSolved === 0
                ? 0
                : (topic.solved / maxSolved) * 100;

        const efficiencyComponent =
            maxAverageAttempts === 0
                ? 100
                : 100 -
                  (topic.averageAttempts /
                   maxAverageAttempts) * 100;

        const ratingComponent =
            maxAverageRating === 0
                ? 0
                : (topic.averageRating /
                   maxAverageRating) * 100;

        const strengthScore =

            successComponent * 0.45 +

            solvedComponent * 0.25 +

            efficiencyComponent * 0.20 +

            ratingComponent * 0.10;

        return {

            topic: topic.topic,

            strengthScore:
                Number(strengthScore.toFixed(2)),

            factors: {

                successRate:
                    topic.successRate,

                solved:
                    topic.solved,

                averageAttempts:
                    topic.averageAttempts,

                averageRating:
                    topic.averageRating,

            },

        };

    });

    strengths.sort(
        (a, b) =>
            b.strengthScore -
            a.strengthScore
    );

    return strengths.slice(0, 5);

}

module.exports = {
    calculateStrengths,
};