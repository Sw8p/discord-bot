const Discord = require('discord.js');

const config = require('./config.json');
// const arguments = require('./arguments.js');

const client = new Discord.Client();

const { prefix } = config;

client.once('ready', () => {
	console.log('Ready!');
	console.log(`${client.user}`);
	console.log(
		`name: ${client.user.username} - discriminator: ${
			client.user.discriminator
		}`
	);
	console.log('Connect to :');
	client.guilds.forEach((guild, key) =>
		console.log(`${guild.name} - ID: ${key}\n`)
	);
});

// client.on('message', msg => {
// 	console.log(msg);
// });

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	// .split(/ +/) better than .split(' ') to remove spaceS cause use regex and remove multy spaceS
	const command = args.shift().toLowerCase();

	if (command.includes('ood')) {
		if (command === 'ood?') {
			message.channel.send(config.ood);
		} else if (command === 'ood!') {
			message.channel.send('Yes master ... 🦑');
		} else {
			message.channel.send('Gniark ! 👽');
		}
	} else if (command === 'server') {
		if (message.guild && message.guild.available) {
			message.channel.send(
				`Server name: ${message.guild.name}\nTotal members: ${
					message.guild.memberCount
				}\nLiving time: ${message.guild.createdAt}`
			);
			message.channel.send('Liste of members are available ...');
			message.guild.members.map(member => {
				console.log(member.user.username);
			});
		}
	} else if (command === 'user-info') {
		message.channel.send(
			`Username: ${message.author.username}\nID: ${message.author.id}`
		);
		// console.log(message.author);
	} else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`Missing arguments, ${message.author} !`);
		} else if (args.includes('foo')) {
			return message.channel.send('bar');
		}

		message.channel.send(
			`Arguments : ${args.join()}\nArguments length : ${args.length}`
		);
	} else if (command === 'kick') {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	} else if (command === 'avatar') {
		if (!message.mentions.users.size) {
			return message.channel.send(
				`Your avatar: ${message.author.displayAvatarURL}`
			);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL}`;
		});
		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);
	} else if (command === 'prune') {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply(
				'command prune need a valid number argument to delet old message ...'
			);
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 100.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send(
				'there was an error trying to prune messages in this channel!'
			);
		});
	} else {
		message.channel.send(`Sorry Master ... 🦑 \n
			I don't understand the command \`${command}\``);
	}
});

client.login(config.token);
