const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
const moment = require('moment');
require('moment-duration-format');
const language = require('../../../config.json')
const core = require('bit/core')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        /*.setNameLocalizations({
            de: 'info',
            fr: 'info',
        })*/
		.setDescription('Get advanced information about the guild you\'re in.')
        /*.setDescriptionLocalizations({
            de: 'Erhalten Sie erweiterte Informationen über den Bot.',
            fr: 'Obtenez des informations avancées sur le bot.',
        })*/
        .setIntegrationTypes(0)
        .setContexts(0),
	async execute(interaction) {
        const client = interaction.client
        var lan = language;
        const locale = require('../../../locale/'+lan+'.json')

        const guild = interaction.guild;
        var guild_name

        if(guild.partnered || guild.verified) {
            guild_name = guild.name+" ✅"
        } else {
            guild_name = guild.name
        }

        const embed = new EmbedBuilder()
            .setTitle('Server Info | '+guild_name)
            .setThumbnail(guild.iconURL())
            if(guild.description != null) {
                embed.setDescription(guild.description)
            }
            embed.addFields([
                { name: 'ID', value: guild.id.toString(), inline: true },
                { name: 'Owner', value: '<@'+guild.ownerID+'>', inline: true },
                { name: 'Creation Date', value: '<t:'+Math.floor(new Date(guild.createdAt).getTime() / 1000)+'>', inline: true },
                { name: 'Is partnered?', value: guild.partnered.toString(), inline: true },
                { name: 'Is Verified?', value: guild.verified.toString(), inline: true },
            ])
            if(guild.rulesChannelId != null) {
                embed.addFields({ name: 'Rules Channel', value: '<#'+guild.rulesChannelId.toString()+'>', inline: true })
            }
            embed.addFields([
                { name: 'Boost Tier | Count', value: '${guild.premiumTier} | ${guild.premiumSubscriptionCount}', inline: true },
                { name: 'Total Users', value: guild.memberCount.toString(), inline: true },
                { name: 'Total Channels', value: guild.channels.cache.size.toString(), inline: true },
                { name: 'Roles', value: guild.roles.cache.size.toString(), inline: true },
            ])
            embed.setTimestamp();
            if(guild.bannerURL != null) {
                embed.setImage(guild.bannerURL())
            }
        interaction.reply({ embeds: [embed] })
	}
};