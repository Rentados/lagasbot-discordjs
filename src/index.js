const HexaClient = require('./Structures/HexaStudiosClient');
const config = require('../config.json');

const client = new HexaClient(config);
client.login();
