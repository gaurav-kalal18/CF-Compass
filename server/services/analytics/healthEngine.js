function calculateHealthScore(
    topicAnalytics,
    difficultyAnalytics,
    weakTopics,
    strongTopics
) {

    if (topicAnalytics.length === 0) {

        return {
            score: 0,
            grade: "D",
            summary: "No analytics available."
        };

    }

    const averageTopicSuccess =
        topicAnalytics.reduce(
            (sum, topic) => sum + topic.successRate,
            0
        ) / topicAnalytics.length;

    const averageDifficultySuccess =
        difficultyAnalytics.length === 0
            ? 0
            : difficultyAnalytics.reduce(
                  (sum, level) =>
                      sum + level.successRate,
                  0
              ) / difficultyAnalytics.length;

    const topicCoverage =
        Math.min(topicAnalytics.length, 20) / 20 * 100;

    const focusPenalty =
        Math.min(weakTopics.length * 2, 100);

    let score =

        averageTopicSuccess * 0.40 +

        averageDifficultySuccess * 0.25 +

        topicCoverage * 0.20 +

        (100 - focusPenalty) * 0.15;

    score = Math.max(
        0,
        Math.min(100, score)
    );

    score = Number(score.toFixed(2));

    let grade;

    if (score >= 90)
        grade = "S";

    else if (score >= 80)
        grade = "A";

    else if (score >= 70)
        grade = "B";

    else if (score >= 60)
        grade = "C";

    else
        grade = "D";

    const strongest =
        strongTopics.length > 0
            ? strongTopics[0].topic
            : "N/A";

    const focus =
        weakTopics.length > 0
            ? weakTopics[0].topic
            : "N/A";

    const summary =
        `Strong in ${strongest}. Focus next on ${focus}.`;

    return {

        score,

        grade,

        summary,

    };

}

module.exports = {
    calculateHealthScore,
};