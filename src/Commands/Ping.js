const Command = require('../Structures/Command');
const Discord = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong']
		});
	}
	async run(message) {
		const msg = await message.channel.send('Pinging...');
		const latency = msg.createdTimestamp - message.createdTimestamp;
		const Embed = new Discord.MessageEmbed()
			.setTitle('Ping')
			.setColor('#62ff00')
			.addFields(
				{ name: 'Bot Latency', value: `\`${latency}ms\`` },
				{ name: 'API Latency', value: `\`${Math.round(this.client.ws.ping)}ms\`` }
			);
		msg.edit(Embed);
	}

};
