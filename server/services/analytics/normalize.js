function normalizeSubmissions(submissions) {
    const problems = new Map();

    submissions.forEach((submission) => {

        // Ignore compilation errors
        if (submission.verdict === "COMPILATION_ERROR") {
            return;
        }

        const contestId = submission.problem.contestId;

        const index = submission.problem.index;

        // Ignore problems without contest information
        if (!contestId || !index) {
            return;
        }

        const problemId = `${contestId}-${index}`;

        if (!problems.has(problemId)) {

            problems.set(problemId, {

                problemId,

                contestId,

                index,

                name: submission.problem.name,

                rating: submission.problem.rating || 0,

                tags: submission.problem.tags || [],

                solved: false,

                attempts: 0,

                verdictHistory: [],

                firstAttemptTime: submission.creationTimeSeconds,

                lastAttemptTime: submission.creationTimeSeconds,

                acceptedTime: null,

            });

        }

        const problem = problems.get(problemId);

        problem.attempts++;

        problem.verdictHistory.push(submission.verdict);

        if (
            submission.creationTimeSeconds <
            problem.firstAttemptTime
        ) {
            problem.firstAttemptTime =
                submission.creationTimeSeconds;
        }

        if (
            submission.creationTimeSeconds >
            problem.lastAttemptTime
        ) {
            problem.lastAttemptTime =
                submission.creationTimeSeconds;
        }

        if (submission.verdict === "OK") {

            problem.solved = true;

            if (
                problem.acceptedTime === null ||
                submission.creationTimeSeconds <
                    problem.acceptedTime
            ) {
                problem.acceptedTime =
                    submission.creationTimeSeconds;
            }

        }

    });

    return [...problems.values()];
}

module.exports = {
    normalizeSubmissions,
};