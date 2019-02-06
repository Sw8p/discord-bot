module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp'], // php => ProFile Picture
	description: 'Get the avatar URL of tagged user.s or your own',
	cooldown: 10,
	execute(message, args) {
		const { users } = message.mentions;

		if (!users.size) {
			return message.channel.send(
				`Your avatar: ${message.author.displayAvatarURL}`
			);
		}

		const avatarList = users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL}`;
		});
		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);
	},
};
