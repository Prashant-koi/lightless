require('dotenv').config();
const {  EmbedBuilder } = require('discord.js');

const client = require('./index');

client.on('guildMemberAdd', member => {
    

    // Create welcome embed
    const welcomeEmbed = new EmbedBuilder()
      .setColor('#5cf000')
      .setTitle(`**${member.user.username}** is the **${member.guild.memberCount}**th member`)
      .setImage('https://cdn.pixabay.com/photo/2014/09/29/10/19/purple-465931_1280.jpg');

    const channel = member.guild.channels.cache.find(i => i.name === 'welcome');
    if (channel) channel.send({ embeds: [welcomeEmbed] }); // Send as an embed
});

client.on('guildMemberRemove', member => {
    // Create goodbye embed
    const goodbyeEmbed = new EmbedBuilder()
      .setColor('#f00000')
      .setTitle(`**${member.user.username}** left :(. Leaving us with **${member.guild.memberCount}** members`)
      .setImage('https://cdn.pixabay.com/photo/2014/09/29/10/19/purple-465931_1280.jpg');

    const channel = member.guild.channels.cache.find(i => i.name === 'welcome');
    if (channel) channel.send({ embeds: [goodbyeEmbed] }); // Send as an embed
});