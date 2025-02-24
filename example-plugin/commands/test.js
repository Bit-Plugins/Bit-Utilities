const { EmbedBuilder, version: discordVersion, SlashCommandBuilder } = require('discord.js')
const moment = require('moment');
require('moment-duration-format');

module.exports = {
	// An optional setting to allow for a command cooldown (defaults to 3 seconds)
	cooldown: 5,
	// Just a regular slash command builder through discord.js.
	// You can check out their guide for more advanced command creation: https://discordjs.guide/slash-commands/advanced-creation.html#adding-options
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test the new plugins system.')
        .setIntegrationTypes(0,1)
        .setContexts(0,1,2),
	async execute(interaction) {
        interaction.reply({ content: "Test works" })
	}
};