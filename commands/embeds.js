const Discord = require('discord.js');
const { ood, ubuntu } = require('../config.json');
const assetsUrl = './assets/';

const myEmbed = new Discord.RichEmbed()
	.setColor('#00ff83')
	.attachFiles([
		`${assetsUrl}FFEsNOKfJLml.jpg`,
		`${assetsUrl}exterminate-mini.jpg`,
		`${assetsUrl}calmExterminate.jpg`,
	])
	.setTitle('Hello embed message !')
	.setURL('https://github.com/Sw8p/discord-bot')
	.setAuthor(
		'Ood',
		'attachment://exterminate-mini.jpg',
		'https://github.com/Sw8p/discord-bot'
	)
	.setDescription(ood)
	.setThumbnail('attachment://calmExterminate.jpg')
	.addField('Regular field title', 'Some value here')
	.addBlankField()
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.setImage('attachment://FFEsNOKfJLml.jpg')
	.setTimestamp()
	.setFooter(ubuntu, 'attachment://exterminate-mini.jpg');

module.exports = {
	name: 'embeds',
	description: 'make a wonderful embeded message ...',
	execute(message, args) {
		message.channel.send(myEmbed);
	},
};
