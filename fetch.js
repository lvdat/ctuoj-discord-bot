const cheerio = require('cheerio')
const { fetchData } = require('./api')

const getUserDescription = (username) => {
    fetchData('/user/' + username)
    .then(data => {
        let htmlstr = data
        const $ = cheerio.load(htmlstr)
        const contentDescriptionDiv = $('.content-description')
        const aboutParagraph = contentDescriptionDiv.find('h4:contains("About"), h4:contains("Thông tin")').next('p').text()
        console.log(aboutParagraph)
        return aboutParagraph.trim()
    })
    .catch (err => {
        throw(err)
    }) 
}

module.exports = {
    getUserDescription
}