const Command = require('../Structures/Command');

module.exports = class extends Command {

	async run(message, args) {
		// ilk önce muteleyen kişiyi check edicez mute yetkisi var mı ?
		if (!message.member.hasPermission('MANAGE ROLES') || !message.guild.owner) return;
		// console.log(args);
		// Mute sebebi ve mute yiyeni tanımlcıaz
		const mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		// eslint-disable-next-line consistent-return
		if (!mutee) return message.channel.send('Please supply a user to be muted');
		let reason = args.slice(1).join(' ');
		if (!reason) reason = 'No reason given';
		let muterole = message.guild.roles.cache.find(rle => rle.name === 'MutedbyLagas');
		if (!muterole) {
			try {
				muterole = await message.guild.roles.create({ data: {
					name: 'MutedbyLagas'
				} });
				// eslint-disable-next-line no-unused-vars
				message.guild.channels.cache.array().forEach(async (channel, id) => {
					await channel.overwritePermissions([{
						id: muterole.id,
						deny: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SEND_TTS_MESSAGES', 'ATTACH_FILES', 'SPEAK']
					}]);
				});
				// add role to all channels this role cant speak, cant write bla bla
			} catch (exception) {
				console.log(exception.stack);
			}
		}
		mutee.roles.add(muterole.id).then(() => {
			message.delete();
			mutee.send(`You're muted from ${message.guild.name} for : ${reason}`);
			message.channel.send(`<@!${mutee.id}> muted!`);
		});
	}

};
