const {
    fetchSubmissionHistory,
} = require("../services/codeforcesService");

const {
    analyzeSubmissions,
} = require("../services/analyticsService");

async function getAnalytics(req, res) {
    try {

        const handle = req.params.handle;

        const data = await fetchSubmissionHistory(handle);

        const analytics = analyzeSubmissions(data.result);

        res.json(analytics);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Unable to analyze submissions",
        });

    }
}

module.exports = {
    getAnalytics,
};