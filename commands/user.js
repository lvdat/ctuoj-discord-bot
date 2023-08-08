const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { queryAPI } = require('../api')
const moment = require('moment-timezone');
require('moment/locale/vi');
// console.log(fetchUser('lvdat'))
const gmtOffset = 7;
const Embed = (data) => new EmbedBuilder()
    .setColor(13250094)
    .addFields(
        {
            name: 'Username', value: data.username
        })
    .addFields(
        {
            name: 'Problem count', value: data.problem_count.toString()
        })
    .addFields(
        {
            name: 'Point', value: data.points.toString()
        })
    .addFields(
        {
            name: 'Rating', value: data.rating.toString()
        })
    .setFooter({
        text: 'API v' + data.api_version + ' | Update ' + moment(data.fetched).utcOffset(gmtOffset * 60).format('HH:mm DD/MM/YYYY'),
        iconURL: 'https://i.imgur.com/NYzvD4X.png'
    })

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('View info CTUOJ user')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Input username on CTUOJ')
        ),
    async execute(interaction) {
        const username = interaction.options.getString('username')
        let dataapi = {
            username,
            api_version: "",
            fetched: "",
        }
        queryAPI('/api/v2/user/' + dataapi.username)
            .then(data => {
                // datai.APIData = data
                dataapi.api_version = data.api_version
                dataapi.fetched = data.fetched
                dataapi_object = data.data.object
                dataapi.points = dataapi_object.points
                dataapi.problem_count = dataapi_object.problem_count
                dataapi.rating = dataapi_object.rating
                dataapi.solved_problems = dataapi_object.solved_problems

                interaction.reply({
                    embeds: [Embed(dataapi)]

                })
            })
            .catch (err => {
                console.log(err)
            }) 

    }
}