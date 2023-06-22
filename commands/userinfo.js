module.exports = {
  name: 'userinfo',
  description: 'Get the information of a user.',
  options: [
    {
      name: 'user',
      type: 6, //USER TYPE
      description: 'The user you want to get information about.',
      required: true,
    },
  ],
  execute(interaction, client) {
    const member = interaction.options.get('user').value;
    const user = client.users.cache.get(member);

    interaction.reply({
      content: `Name: ${user.username} \nID: ${user.id} \nPhoto: ${user.displayAvatarURL({dynamic: true})}`,
      ephemeral: true,
    });
  },
};
