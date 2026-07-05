const {
    fetchUserProfile,
    fetchRatingHistory,
    fetchSubmissionHistory,
} = require("../services/codeforcesService");

async function getProfile(req, res) {
    try {
        const handle = req.params.handle;
const data = await fetchUserProfile(handle);

const user = data.result[0];

res.json({
    handle: user.handle,
    name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
    rating: user.rating,
    maxRating: user.maxRating,
    rank: user.rank,
    maxRank: user.maxRank,
    contribution: user.contribution,
    country: user.country,
    organization: user.organization,
    avatar: user.avatar,
});
    } catch (error) {
    console.log(error);

    res.status(500).json({
        error: "Unable to fetch profile",
    });
}
}

async function getRatingHistory(req, res) {
    try {
        const handle = req.params.handle;

        const data = await fetchRatingHistory(handle);

        res.json(data.result);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Unable to fetch rating history",
        });
    }
}

async function getSubmissionHistory(req, res) {
    try {
        const handle = req.params.handle;

        const data = await fetchSubmissionHistory(handle);

        res.json(data.result);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Unable to fetch submission history",
        });
    }
}


module.exports = {
    getProfile,
    getRatingHistory,
    getSubmissionHistory,
};