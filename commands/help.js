const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'List of commands.',
	execute(interaction) {
		let str = ''
		const commandFiles = fs
			.readdirSync('./commands')
			.filter(file => file.endsWith('.js'))

		for (const file of commandFiles) {
			const command = require(`./${file}`)
			str += `Command: ${command.name}, Do: ${command.description} \n`
		}

		return void interaction.reply({
			content: str,
			ephemeral: true
		})
	}
}
