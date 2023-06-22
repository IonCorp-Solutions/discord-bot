const {GuildMember} = require('discord.js');

module.exports = {
  name: 'pause',
  description: 'Pause the currently playing music',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'Enter to **' + interaction.guild.me.voice.channel.name + '** for pause!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
				content:
					'Enter to **' +
					interaction.guild.me.voice.channel.name +
					'** for pause!',
				ephemeral: true
			})
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ | No music in the queue!',
      });
    const success = queue.setPaused(true);
    return void interaction.followUp({
      content: success ? '⏸ | Pause!' : '❌ | Error!',
    });
  },
};
