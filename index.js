const fs = require('fs');
const Discord = require('discord.js');

const { prefix, token, ood } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Add cmde dynamically with fs and collection
	// set new item in the Collection
	// with key as command name and value as the exported module --- awesome ^^
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(`${client.user} Ready !`);
	console.log(
		`name: ${client.user.username} - discriminator: ${
			client.user.discriminator
		}`
	);
	console.log('Connect to :');
	client.guilds.forEach((guild, key) =>
		console.log(`${guild.name} - ID: ${key}`)
	);

	console.log('available commands : ');
	client.commands.forEach((cmd, key) => console.log(key));
	console.log('\n');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	console.log(`commandName: ${commandName}\nargs: ${args}`);

	if (!client.commands.has(commandName)) {
		message.channel.send(`Sorry Master ... 🦑 \n
			I don't understand the command \`${commandName}\``);
		return;
	}

	const command = client.commands.get(commandName);

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply(
			'I can\'t execute that command inside DMs `-DirectMessage-`!'
		);
	}

	if (command.args && (!args.length || args.length !== command.args)) {
		let reply = `Missing arguments, ${message.author} !`;

		if (command.usage) {
			reply += `\nTry \`${prefix}${command.name} ${command.usage}\` `;
		}
		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (err) {
		console.error(err);
		message.reply('that command catch an error ... Sorry ! 💫');
	}
});

client.login(token);
