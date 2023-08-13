require('dotenv').config()

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

const RankRoleId = [
    process.env.UNRATED_ROLE_ID,
    process.env.NEWBIE_ROLE_ID,
    process.env.PUPIL_ROLE_ID,
    process.env.SPECIALIST_ROLE_ID,
    process.env.EXPERT_ROLE_ID,
    process.env.CANDIDATE_MASTER_ROLE_ID,
    process.env.MASTER_ROLE_ID,
    process.env.GRAND_MASTER_ROLE_ID,
    process.env.TARGET_ROLE_ID,
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