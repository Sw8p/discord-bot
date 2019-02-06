module.exports = {
	name: 'members',
	description: 'Display all or connected members on this server',
	execute(message, args) {
		if (args === 'all') {
			return;
		}
		message.channel.send('Liste of members are available ...');
		message.guild.members.map(member => {
			console.log(member.user);
		});
	},
};
