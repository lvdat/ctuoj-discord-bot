const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { fetchData } = require('../api')
const { User } = require('../db')
const cheerio = require('cheerio')
const moment = require('moment-timezone')
require('moment/locale/vi')
const gmtOffset = 7
const checkUserExist = async (discord_uid) => {
    const query = await User.findOne({
        discord_uid
    })
    return !(query === null || !query || query == [])
}

const addUser = async (discord_uid) => {

}

const Embed = (data) => new EmbedBuilder()
    .setColor(13250094)
    .addFields(
        {
            name: 'Discord user', value: `${data.discord_username} (${data.discord_uid})`
        })
    .addFields(
        {
            name: 'Description', value: `${data.description}`
        })
    .addFields(
        {
            name: 'Linked', value: `${data.linked.toString()}`
        })
    .setFooter({
        text: 'API v2 | Update ' + moment(data.fetched).utcOffset(gmtOffset * 60).format('HH:mm DD/MM/YYYY'),
        iconURL: 'https://i.imgur.com/NYzvD4X.png'
    })

module.exports = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Link Discord account to CTUOJ')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Input username on CTUOJ')
        ),
    async execute(interaction) {
        const username = interaction.options.getString('username')
        const author = interaction.user
        let dataapi = {
            username,
            discord_username: author.username,
            discord_uid: author.id,
            fetched: new Date(),
            description: "",
            linked: null,
        }
        fetchData('/user/' + dataapi.username)
            .then(data => {
                let htmlstr = data
                const $ = cheerio.load(htmlstr)
                const contentDescriptionDiv = $('.content-description')
                const aboutParagraph = contentDescriptionDiv.find('h4:contains("About"), h4:contains("Thông tin")').next('p').text()
                dataapi.description = aboutParagraph
                checkUserExist(author.id)
                    .then(linkedd => {
                        dataapi.linked = linkedd
                        interaction.reply({
                            embeds: [Embed(dataapi)]
                        })
                    })
            })
            .catch(err => {
                console.log(err)
            })

    }
}