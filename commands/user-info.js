module.exports = {
	name: 'user-info',
	description: 'Display info about user',
	execute(message, args) {
		const { users } = message.mentions;

		if (!users.size) {
			return message.channel.send(
				`Username: ${message.author.username}\nID: ${message.author.id}`
			);
		}
		const usersInfo = users.map(user => {
			return `@${user.username}, ID: ${user.id}`;
		});
	},
};
