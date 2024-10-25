require('dotenv').config()

const { Client, GatewayIntentBits } = require('discord.js');
const { Message } = require('discord.js');
const client = require('./index');

const userData = {}

client.on ('messageCreate', message =>{
    if (message.author.bot) return;

    const userId =  message.author.id;

    if (!userData[userId]){
        userData[userId] = {messageCounts: 0, exp: 0}
    }

    userData[userId].messageCounts++;
    userData[userId].exp += 24

    console.log(`User ${message.author.username} has ${userData[userId].messageCounts} messages and ${userData[userId].exp} exp.`);
})

module.exports = userData;