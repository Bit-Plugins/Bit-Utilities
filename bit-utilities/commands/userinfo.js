const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
const moment = require('moment');
require('moment-duration-format');
const language = require('../../../config.json')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('userinfo')
        /*.setNameLocalizations({
            de: 'info',
            fr: 'info',
        })*/
		.setDescription('Get user information.')
        /*.setDescriptionLocalizations({
            de: 'Erhalten Sie erweiterte Informationen über den Bot.',
            fr: 'Obtenez des informations avancées sur le bot.',
        })*/
        .setIntegrationTypes(0)
        .setContexts(0)
        .addUserOption((option) =>
            option.setName('user')
            .setDescription("The user you want information on (Optional)")
            .setRequired(false)),
	async execute(interaction) {
        const client = interaction.client
        var lan = language;
        const locale = require('../../../locale/'+lan+'.json')

        var user;
        var member;
        if(interaction.options.getUser('user')) {
            user = interaction.options.getUser('user')
        } else {
            user = interaction.user
        }

        member = interaction.guild.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setTitle(user.username+' | User Information')
            .setThumbnail(member.displayAvatarURL())
            .setColor(user.displayHexColor)
            .addFields(
                { name: 'Display Name', value: member.displayName, inline: true },
                { name: 'Joined At', value: '<t:'+Math.floor(new Date(member.joinedAt).getTime() / 1000)+'>', inline: true },
                { name: '\u200b', value: '\u200b', inline: true },
                { name: 'Roles', value: member.roles.cache.map(r => r.toString()).join(' | ') }
            )
            .setFooter({ text: 'ID: '+user.id+ ' | User Created: ' })
            .setTimestamp(user.createdTimestamp)
            if(member.displayBannerURL() != null) {
                embed.setImage(member.displayBannerURL())
            } else {
                if(member.bannerURL() != null) {
                    embed.setImage(member.bannerURL())
                }
            }
        interaction.reply({ embeds: [embed] });
	}
};