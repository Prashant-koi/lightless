require('dotenv').config();
const{PermissionsBitField, EmbedBuilder}= require('discord.js');

const client= require('./index')



client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'hello') {
      await interaction.reply(`${interaction.guild.name} is the name of your guild.`);
    }
  
    //For command /serverinfo
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
      creationDate = Math.floor((interaction.guild.createdTimestamp)/1000);

      const textChannels = interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT');
  
      const infoEmbed = new EmbedBuilder() 
        .setAuthor({name: 'Server info', iconURL:`${interaction.guild.iconURL()}`})
        .setColor("#ff0145")
        .setThumbnail(`${interaction.guild.iconURL()}`)
        .setFooter({text : `${interaction.user.username}`})
        .setDescription(`
- **Server Name:** ${interaction.guild.name}
- **Server Owner:** ${owner.user.tag}
- **Creation date:** <t:${creationDate}:F>
- **Number of Members:** ${interaction.guild.memberCount}
- **Server Icon:** [Click Here](${interaction.guild.iconURL()})
- **Server Boosts:** ${interaction.guild.premiumSubscriptionCount}
- **Roles:** ${((await interaction.guild.roles.fetch()).size)}
- **Channels:** ${(await interaction.guild.channels.fetch()).size}
- **Number of Banned Members:** ${guild.bans.cache.size}
- **Number of Admins:** ${membersWithAdmin}
  
        `);
        
        await (channelName.send({ embeds: [infoEmbed] }));
      
    }

    //For command /ban
    if (interaction.commandName === 'ban'){
      const member = interaction.options.getUser('member');
      const guildMember = interaction.guild.members.cache.get(member.id);

      if (!guildMember) {
        interaction.reply(`The member is not in the server!`)
      }

      try {
        await guildMember.ban();
        await interaction.reply(`${member.tag} has been banned.`)
      } catch (error) {
        console.error(error);
        await interaction.reply(`There was an error while banning this member!`)
      }


    }

    if (interaction.commandName === 'mute'){
      const member= interaction.options.getUser('member');
      const muteLength = interaction.options.getInteger('muteTime');
      const guildMember = interaction.guild.member.cache.get(member.id);

      if (!guildMember) {
        interaction.reply(`The given member is not in the server!`)
      }

      try{
        await guildMember.muteTime(muteLength)
        await interaction.reply(`${member.tag} has been muted for ${muteLength}`)
      } catch (error) {
        console.error(error);
        await interaction.reply(`There was an error! Please try again!`)
      }
    }
  });