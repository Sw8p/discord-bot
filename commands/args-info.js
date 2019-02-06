module.exports = {
	name: 'args-info',
	description: 'List all the Arguments',
	args: true,
	execute(message, args) {
		if (args.includes('foo')) {
			return message.channel.send('bar');
		}

		message.channel.send(
			`Arguments : ${args.join()}\nArguments length : ${args.length}`
		);
	},
};
