const RankRating = [0, 1200, 1400, 1600, 1900, 2400, 3000, 1e9]
const Rank = [
    "Unrated",
    "Newbie",
    "Pupil",
    "Specialist",
    "Expert",
    "Candidate Master",
    "Master",
    "Grandmaster",
    "Target",
]

const RankWithRating = (rating) => {
    if (rating === 0) return Rank[0]
    for (let i = RankRating.length - 1; i >= 0; i--) {
        if (rating > RankRating[i - 1]) {
            return Rank[i]
        }
    }
}

module.exports = {
    RankWithRating
}