const { normalizeSubmissions } = require("./analytics/normalize");
const { analyzeTopics } = require("./analytics/topicAnalyzer");
const { analyzeDifficulty } = require("./analytics/difficultyAnalyzer");
const {
    calculateWeakness,
} = require("./analytics/weaknessEngine");
const {
    calculateStrengths,
} = require("./analytics/strengthEngine");
const {
    calculateHealthScore,
} = require("./analytics/healthEngine");
const {
    generateRecommendations,
} = require("./analytics/recommendationEngine");

function analyzeSubmissions(submissions) {

    const problems =
        normalizeSubmissions(submissions);

    const topicAnalytics =
        analyzeTopics(problems);

    const difficultyAnalytics =
        analyzeDifficulty(problems);

    const weakTopics =
    calculateWeakness(topicAnalytics);

    const strongTopics =
    calculateStrengths(topicAnalytics);

    const healthScore =
    calculateHealthScore(
        topicAnalytics,
        difficultyAnalytics,
        weakTopics,
        strongTopics
    );

    const recommendations =
    generateRecommendations(
        weakTopics,
        topicAnalytics
    );

 return {

    totalProblems:
        problems.length,

    healthScore,

    topicAnalytics,

    difficultyAnalytics,

    weakTopics,

    strongTopics,

    recommendations,

};
}

module.exports = {
    analyzeSubmissions,
};