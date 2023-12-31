const {GuildMember} = require('discord.js');

module.exports = {
	name: 'stop',
	description: 'Stop the queue!',
	async execute(interaction, player) {
		if (
			!(interaction.member instanceof GuildMember) ||
			!interaction.member.voice.channel
		) {
			return void interaction.reply({
				content: 'You are not in the channel!',
				ephemeral: true
			})
		}

		if (
			interaction.guild.me.voice.channelId &&
			interaction.member.voice.channelId !==
				interaction.guild.me.voice.channelId
		) {
			return void interaction.reply({
				content: 'You are not in the channel!',
				ephemeral: true
			})
		}

		await interaction.deferReply()
		const queue = player.getQueue(interaction.guildId)
		if (!queue || !queue.playing)
			return void interaction.followUp({
				content: '❌ | No queue!'
			})
		queue.destroy()
		return void interaction.followUp({ content: '🛑 | Queue Stopped' })
	}
}
