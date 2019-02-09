const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	alias: ['sos', 'commands'],
	description: 'list all commands or info about specific one',
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push(
				`Use \`${prefix}help [command name]\` to get info on a specific command`
			);
			data.push('I respond to : ');
			commands.map(cmd =>
				data.push(`${cmd.name} ${cmd.usage ? cmd.usage : ''}`)
			);

			return message.author
				.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply(
						'Here to serve !\nI send you a DM with all my commands 🌈'
					);
				})
				.catch(err => {
					console.error(
						`Couldn't send help DM to ${message.author.tag}\n`,
						err
					);
					message.reply('OMG, I can\'t DM you ! \nHave you disabled DMs?');
				});
		} else {
			const arg = args.shift().toLowerCase();

			const command =
				commands.get(arg) ||
				commands.find(c => c.aliases && c.aliases.includes(arg));
			console.log(command);

			if (!command) {
				return message.reply('that\'s not a valid command!');
			}
			const { name, description, aliases, usage } = command;

			data.push(`You need help on \`${name}\``);
			data.push(`Description : \`${description}\``);
			command.args &&
				data.push(
					`You need to use ${
						typeof command.args == 'number' ? command.args : ''
					} argument.s`
				);
			aliases && data.push(`You can also use this alias.es : \`${aliases}\``);
			data.push(`Try : \`${prefix}${name} ${usage ? usage : ''}\``);

			message.channel.send(data, { split: true });
		}
	},
};
