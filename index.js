const fs = require('fs');
const Discord = require('discord.js');

const { prefix, token, ood } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

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
	// console.log(`commandName: ${commandName}\nargs: ${args}`);

	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			cmd => cmd.aliases && cmd.aliases.includes(commandName)
		);

	if (!command) {
		// TODO: use brainjs to get some user mistake on command
		// and use it to purpose the probably good command ...
		message.channel.send(`Sorry Master ... 🦑 \n
				I don't understand the command \`${commandName}\``);
		return;
	}

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

	// Add cooldown control to prevent user spam
	// Cooldown is Collection of collection using command name, userId and Date to determine right to reuse command
	// {commandName: {UserID: UsedDate}}
	// Cooldown can be specify on the command Map or is set to 3' by default
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`Power is not absolut ...\nWait ${timeLeft.toFixed(
					1
				)} second.s before reusing \`${prefix}${command.name}\``
			);
		} else {
			timestamps.delete(message.author.id);
		}
	}

	timestamps.set(message.author.id, now);
	// console.log('cooldowns : ', cooldowns);

	try {
		command.execute(message, args);
	} catch (err) {
		console.error(err);
		message.reply('that command catch an error ... Sorry ! 💫');
	}
});

client.login(token);
