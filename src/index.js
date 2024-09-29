require('dotenv').config();
require('./register-commands'); // Ensure command registration runs first

const { Client, GatewayIntentBits, PermissionsBitField, EmbedBuilder, } = require('discord.js');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  require('./welcome');
  require('./command-execute');
});

// Exporting the client here so that I can import it in other files and not create multiple clients
module.exports = client;

client.login(process.env.TOKEN);
