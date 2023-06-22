const fs = require('fs');
const Discord = require("discord.js");
const Client = require('./client/index');
const config = require("./config.json");
const {Player} = require('discord-player');

const client = new Client();
client.commands = new Discord.Collection();

client.once("ready", async() => {
  var bot = client.channels.cache.get("CHANERL_KEY");
  bot.send("!deploy");
});

// var canal = client.channels.cache.get("CHANERL_KEY");

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const player = new Player(client);


player.on('error', (queue, error) => {
  console.log(`[${queue.guild.name}] Error: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  console.log(`[${queue.guild.name}] Error: ${error.message}`);
});

player.on('trackStart', (track) => {
  queue.metadata.send(`▶ | Listening: **${track.title}** in **${queue.connection.channel.name}**!`);
});

player.on('trackAdd', (queue, track) => {
  queue.metadata.send(`🎶 | -> **${track.title}** to the queue!`)
});

player.on('botDisconnect', queue => {
  queue.metadata.send('❌ | Leaving...');
});

player.on('channelEmpty', queue => {
  queue.metadata.send('❌ | Nobody in the channel, leaving...');
});

player.on('queueEnd', queue => {
  queue.metadata.send('✅ | Queue finished!');
});

client.once('ready', async () => {
  console.log('Ready!');
});

client.on('ready', function() {
  client.user.setActivity(config.activity, { type: config.activityType });
});

client.once('reconnecting', () => {
  console.log('Reconnecting!')
});

client.once('disconnect', () => {
  console.log('Disconnected!')
});

// client.on('ready', )

client.on('messageCreate', async message => {
  if (message.content === '!deploy') {
    await message.guild.commands
      .set(client.commands)
      .then(() => {
        // message.reply('Deployed!');
      })
      .catch(err => {
        message.reply('Error :(');
        console.error(err);
      });
  }
});

client.on('interactionCreate', async interaction => {
  const command = client.commands.get(interaction.commandName.toLowerCase());

  try {
    if (interaction.commandName == 'userinfo') {
      command.execute(interaction, client);
    } else {
      command.execute(interaction, player);
    }
  } catch (error) {
    console.error(error);
    interaction.followUp({
      content: 'Error executing the command!',
    });
  }
});


client.login(config.token);
