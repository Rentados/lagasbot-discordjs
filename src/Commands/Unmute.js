const Command = require('../Structures/Command');

module.exports = class extends Command {

	async run(message, args) {
		if (!message.member.hasPermission('MANAGE ROLES') || !message.guild.owner) return;
		const mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		const muterole = message.guild.roles.cache.find(rle => rle.name === 'MutedbyLagas');
		// eslint-disable-next-line consistent-return
		if (!mutee.roles.cache.find(rle => rle.name === 'MutedbyLagas')) {
			message.channel.send('User isn\'t muted!');
			return;
		}
		mutee.roles.remove(muterole.id).then(() => {
			message.delete();
			mutee.send(`You're unmuted from ${message.guild.name}`);
			message.channel.send(`<@!${mutee.id}> unmuted!`);
		});
	}

};
