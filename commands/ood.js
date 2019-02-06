const { ood, meaning_of_life, ubuntu } = require('../config.json');

module.exports = {
	name: 'ood',
	description: 'More Ood',
	execute(message, args) {
		if (!args.length) {
			return message.channel.send('Gniark ! 👽');
		} else if (args.includes('life')) {
			message.channel.send(`${meaning_of_life} !`);
			return message.channel.send(
				'You should meet a friend of mind `Compute-Un`'
			);
		} else if (args.includes('ubuntu')) {
			return message.channel.send(ubuntu);
		} else if (args.includes('?')) {
			message.channel.send(ood);
		} else if (args.includes('!')) {
			message.channel.send('Yes master ... 🦑');
		}
	},
};
