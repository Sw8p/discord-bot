module.exports = {
	name: 'role',
	description: 'give a user role',
	args: 2,
	usage: '<user> <role>',
	execute(message, args) {
		const userRole = {
			user: args[0],
			role: args[1],
		};
		if (args.length > 2) {
			args.slice(2);
			args.map(role => {
				userRole = {
					...userRole,
					role: userRole.role + ' ' + role,
				};
			});
		}
		const { user, role } = userRole;
		const { members } = message.channel.guild;
		let tagUser;
		members.forEach((member, key) => {
			console.log(member.user.tag, member.user.username, member.user.id);
			if (user.includes(key)) {
				tagUser = user;
			} else if (user === member.user.username) {
				tagUser = `<@${member.user.id}>`;
			}
		});

		if (tagUser) {
			message.channel.send(`You give to ${tagUser} the role of ${role}`);
		} else {
			message.reply(
				`${user} does not exist ... \nBut don't worry, we belive ... 👽`
			);
		}
		// TODO: give a real harmless role to the user ...
	},
};
