const {GuildMember} = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'Skip the currently playing music',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: 'Enter to **' + interaction.guild.me.voice.channel.name + '** to skip the track!',
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
					'** to skip the track!',
				ephemeral: true
			})
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return void interaction.followUp({ content: '❌ | Nothing in queue!' })
    const currentTrack = queue.current;
    const success = queue.skip();
    return void interaction.followUp({
      content: success ? `✅ | Skip **${currentTrack}**!` : '❌ | Error!',
    });
  },
};
