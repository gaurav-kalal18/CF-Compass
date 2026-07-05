const axios = require("axios");

async function fetchUserProfile(handle) {
    const response = await axios.get(
        `https://codeforces.com/api/user.info?handles=${handle}`
    );

    return response.data;
}

async function fetchRatingHistory(handle) {
    const response = await axios.get(
        `https://codeforces.com/api/user.rating?handle=${handle}`
    );

    return response.data;
}

async function fetchSubmissionHistory(handle) {
    const response = await axios.get(
        `https://codeforces.com/api/user.status?handle=${handle}`
    );

    return response.data;
}

module.exports = {
    fetchUserProfile,
    fetchRatingHistory,
    fetchSubmissionHistory,
};