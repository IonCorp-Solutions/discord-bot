const {GuildMember} = require('discord.js');

module.exports = {

    name: 'queue',
    description: 'View the queue of current songs!',

    async execute (interaction, player) {

        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            return void interaction.reply({
              content: 'You are not in the channel!',
              ephemeral: true,
            });
          }
    
          if (
            interaction.guild.me.voice.channelId &&
            interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
          ) {
            return void interaction.reply({
							content: 'ou are not in the channel!',
							ephemeral: true
						})
          }
          var queue = player.getQueue(interaction.guildId);
          if (typeof(queue) != 'undefined') {
            trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
              return void interaction.reply({
                embeds: [
                  {
                    title: 'Listening',
                    description: trimString(`Current Song 🎶 | **${queue.current.title}**! \n 🎶 | **${queue}**! `, 4095),
                  }
                ]
              })
          } else {
            return void interaction.reply({
              content: 'No music in the queue!'
            })
          }
    }
}
