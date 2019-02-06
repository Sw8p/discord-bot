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
		console.log('userRole: ', userRole);

		//// TODO: check if user!
		message.channel.send(`You give to @${user} the role of ${role}`);
	},
};
