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

// client.on('interactionCreate', async interaction => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'hello') {
//     await interaction.reply(`${interaction.guild.name} is the name of your guild.`);
//   }

//   if (interaction.commandName === 'serverinfo') {
//     const channelName = interaction.channel;
//     const guild = interaction.guild;

//     if (!guild) {
//       console.log('This command only works in a guild.');
//       return;
//     }

//     // Fetching the members of the guild where the command was used
//     await guild.members.fetch();

//     const owner = await interaction.guild.fetchOwner();

//     const permissionForAdmin = PermissionsBitField.Flags.Administrator;
//     let membersWithAdmin = 0;

//     // Counting members with Administrator permission excluding bots
//     guild.members.cache.forEach(member => {
//       if (member.permissions.has(permissionForAdmin) && !member.user.bot) {
//         membersWithAdmin++;
//       }
//     });

//     const infoEmbed = new EmbedBuilder() 
//       .setAuthor({name: 'Server info', iconURL:`${interaction.guild.iconURL()}`})
//       .setColor("#ffffff")
//       .setThumbnail(`${interaction.guild.iconURL()}`)
//       .setFooter({text : `${interaction.user.username}`})
//       .setDescription(`Server Name: ${interaction.guild.name} \n
//         Server owner: ${owner.user.tag}\n
//         Number of Members: ${interaction.guild.memberCount}\n
//         Number of Banned Members: ${guild.bans.cache.size}\n
//         Number of Admins: ${membersWithAdmin}\n

//       `);
      
//       await (channelName.send({ embeds: [infoEmbed] }));
    
//   }
// });

// Exporting the client here so that I can import it in other files and not create multiple clients
module.exports = client;

client.login(process.env.TOKEN);
