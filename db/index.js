const mongoose = require('mongoose')
const { genString } = require('../utils/hash')
require('dotenv').config()
const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test'

mongoose.connect(URI)

const User = mongoose.model('User', {
    discord_uid: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        default: () => {
            return genString(20)
        },
    }
})

const Linked = mongoose.model('Linked', {
    discord_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ctuoj_username: {
        type: String,
    }
})

module.exports = {
    User,
    Linked
}