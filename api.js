const axios = require('axios')
require('dotenv').config()

const API_HOST = process.env.API_HOST || 'https://dmoj.ctu.edu.vn'
const token = process.env.CTUOJ_TOKEN
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const queryAPI = async (path) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(API_HOST + path, config)
        // console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = {
    queryAPI
}

// queryAPI('/api/v2/user/lvdat')