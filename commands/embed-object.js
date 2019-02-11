const { signIt, signAssets } = require('../sign-it');

module.exports = {
	name: 'embed-object',
	description: 'try embed object, get module object from file sign-it',
	execute(message, args) {
		signMsg = {
			...signIt,
			fields: [
				{
					name: 'Regular field title',
					value: 'Some value here',
				},
				{
					name: '\u200b',
					value: '\u200b',
				},
				{
					name: 'Inline field title',
					value: 'Some value here',
					inline: true,
				},
				{
					name: 'Inline field title',
					value: 'Some value here',
					inline: true,
				},
				{
					name: 'Inline field title',
					value: 'Some value here',
					inline: true,
				},
			],
		};
		message.channel.send({ files: signAssets, embed: signMsg });
	},
};
