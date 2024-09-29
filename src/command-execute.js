require('dotenv').config();
const{PermissionsBitField, EmbedBuilder}= require('discord.js');

const client= require('./index')



client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'hello') {
      await interaction.reply(`${interaction.guild.name} is the name of your guild.`);
    }
  
    if (interaction.commandName === 'serverinfo') {
      const channelName = interaction.channel;
      const guild = interaction.guild;
  
      if (!guild) {
        console.log('This command only works in a guild.');
        return;
      }
  
      // Fetching the members of the guild where the command was used
      await guild.members.fetch();
  
      const owner = await interaction.guild.fetchOwner();
  
      const permissionForAdmin = PermissionsBitField.Flags.Administrator;
      let membersWithAdmin = 0;
  
      // Counting members with Administrator permission excluding bots
      guild.members.cache.forEach(member => {
        if (member.permissions.has(permissionForAdmin) && !member.user.bot) {
          membersWithAdmin++;
        }
      });
  
      const infoEmbed = new EmbedBuilder() 
        .setAuthor({name: 'Server info', iconURL:`${interaction.guild.iconURL()}`})
        .setColor("#ffffff")
        .setThumbnail(`${interaction.guild.iconURL()}`)
        .setFooter({text : `${interaction.user.username}`})
        .setDescription(`Server Name: ${interaction.guild.name} \n
          Server owner: ${owner.user.tag}\n
          Number of Members: ${interaction.guild.memberCount}\n
          Number of Banned Members: ${guild.bans.cache.size}\n
          Number of Admins: ${membersWithAdmin}\n
  
        `);
        
        await (channelName.send({ embeds: [infoEmbed] }));
      
    }
  });