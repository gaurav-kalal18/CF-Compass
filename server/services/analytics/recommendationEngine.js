function generateRecommendations(
    weakTopics,
    topicAnalytics
) {

    if (weakTopics.length === 0) {

        return [];

    }

    const recommendations = [];

    weakTopics.forEach((weakTopic) => {

        const analytics = topicAnalytics.find(
            (topic) =>
                topic.topic === weakTopic.topic
        );

        if (!analytics) return;

        let avgRating = analytics.averageRating;

        // If no solved problems in this topic,
        // recommend beginner problems.
        if (avgRating < 800) {

            avgRating = 900;

        }

        let lower = Math.max(
            800,
            avgRating - 100
        );

        let upper = avgRating + 100;

        // Round to nearest 100
        lower = Math.floor(lower / 100) * 100;
        upper = Math.ceil(upper / 100) * 100;

        let estimatedImpact = "Low";

        if (weakTopic.level === "Critical") {

            estimatedImpact = "Very High";

        }

        else if (
            weakTopic.level ===
            "Needs Practice"
        ) {

            estimatedImpact = "High";

        }

        else if (
            weakTopic.level ===
            "Moderate"
        ) {

            estimatedImpact = "Medium";

        }

        recommendations.push({

            topic: weakTopic.topic,

            reason:
                `${analytics.successRate}% success rate`,

            difficultyRange:
                `${lower}-${upper}`,

            targetProblems: 5,

            estimatedImpact,

        });

    });

    return recommendations;

}

module.exports = {

    generateRecommendations,

};