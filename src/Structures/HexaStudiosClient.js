const { Client, Collection } = require('discord.js');
const Util = require('./Util.js');

module.exports = class HexaClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);
		this.commands = new Collection();
		this.aliases = new Collection();
		this.utils = new Util(this);
		this.once('ready', () => {
			console.log(`Logged in as ${this.user.username}!`);
			console.log(`Bot is ready!`);
			this.user.setPresence({ activity: { name: 'use l!', type: 'WATCHING' }, status: 'idle' });
		});
		this.on('message', async (message) => {
			const mentionRegex = RegExp(`^<@!${this.user.id}$`);
			const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `);
			// console.log(message.content.match(mentionRegex));
			// console.log(message.content.match(mentionRegexPrefix));
			if (!message.guild || message.author.bot) return;
			if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.prefix}\`.`);
			const prefix = message.content.match(mentionRegexPrefix) ?
				message.content.match(mentionRegexPrefix)[0] : this.prefix;
			// eslint-disable-next-line no-unused-vars
			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

			const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
			if (command) {
				command.run(message, args);
			}
		});
	}
	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be type of Object');
		if (!options.token) throw new Error('You must pass the token for the client');
		this.token = options.token;
		if (!options.prefix) throw new Error('You must pass a prefix for the client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of string');
		this.prefix = options.prefix;
	}
	async login(token = this.token) {
		this.utils.loadCommands();
		super.login(token);
	}

};
