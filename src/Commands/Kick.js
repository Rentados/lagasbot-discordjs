const Command = require('../Structures/Command');
module.exports = class extends Command {

	async run(message) {
		if (message.member.hasPermission('KICK_MEMBERS')) {
			const member = message.mentions.members.first();
			message.channel.send(`<@!${member.id}> kicked by <@!${message.author.id}>`);
			member.kick();
		}
	}

};
