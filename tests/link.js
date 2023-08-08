const cheerio = require('cheerio')
const { fetchData } = require('../api')

fetchData('/user/lvdat')
    .then(data => {
        let htmlstr = data
        const $ = cheerio.load(htmlstr)
        const contentDescriptionDiv = $('.content-description');
        const aboutParagraph = contentDescriptionDiv.find('h4:contains("About"), h4:contains("Thông tin")').next('p').text();
        console.log(aboutParagraph.trim())
        // console.log(data)
    })
    .catch (err => {
        console.log(err)
    }) 