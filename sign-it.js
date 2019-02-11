const Discord = require('discord.js');
const { ood, ubuntu } = require('./config.json');
const assetsUrl = './assets/';

const oodAsset = new Discord.Attachment(`${assetsUrl}FFEsNOKfJLml.jpg`);
const extermAsset = new Discord.Attachment(`${assetsUrl}exterminate-mini.jpg`);

const signIt = {
	color: 0x00ff83,
	title: 'Hello Ood bot !',
	url: 'https://github.com/Sw8p/discord-bot',
	author: {
		name: 'Ood',
		icon_url: 'attachment://exterminate-mini.jpg',
		url: 'https://github.com/Sw8p/discord-bot',
	},
	thumbnail: {
		url: 'attachment://FFEsNOKfJLml.jpg',
	},
	timestamp: new Date(),
	footer: {
		text: ood,
		icon_url: 'attachment://exterminate-mini.jpg',
	},
};

module.exports = {
	signIt,
	signAssets: [oodAsset, extermAsset],
};
