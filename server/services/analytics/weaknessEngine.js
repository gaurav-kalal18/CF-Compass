const WEIGHTS = {
    successRate: 0.45,
    solved: 0.25,
    averageAttempts: 0.20,
    averageRating: 0.10,
};

function calculateWeakness(topicAnalytics) {

    if (topicAnalytics.length === 0) {
        return [];
    }

    const maxSolved = Math.max(
        ...topicAnalytics.map(t => t.solved)
    );

    const maxAverageAttempts = Math.max(
        ...topicAnalytics.map(t => t.averageAttempts)
    );

    const maxAverageRating = Math.max(
        ...topicAnalytics.map(t => t.averageRating)
    );

    const result = topicAnalytics.map(topic => {

        const successComponent =
            100 - topic.successRate;

        const solvedComponent =
            maxSolved === 0
                ? 100
                : 100 -
                  (topic.solved / maxSolved) * 100;

        const attemptComponent =
            maxAverageAttempts === 0
                ? 0
                : (topic.averageAttempts /
                   maxAverageAttempts) * 100;

        const ratingComponent =
            maxAverageRating === 0
                ? 100
                : 100 -
                  (topic.averageRating /
                   maxAverageRating) * 100;

        const weaknessScore =

            successComponent *
            WEIGHTS.successRate +

            solvedComponent *
            WEIGHTS.solved +

            attemptComponent *
            WEIGHTS.averageAttempts +

            ratingComponent *
            WEIGHTS.averageRating;

        let level = "";

        if (weaknessScore <= 25)
            level = "Strong";

        else if (weaknessScore <= 50)
            level = "Moderate";

        else if (weaknessScore <= 75)
            level = "Needs Practice";

        else
            level = "Critical";

        return {

            topic: topic.topic,

            weaknessScore:
                Number(weaknessScore.toFixed(2)),

            level,

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

    result.sort(
        (a, b) =>
            b.weaknessScore -
            a.weaknessScore
    );

    return result.slice(0,5);

}

module.exports = {
    calculateWeakness,
};