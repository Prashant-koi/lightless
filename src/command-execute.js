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

    //MUTE MEMBER
    if (interaction.commandName === 'mute'){
      const member= interaction.options.getUser('member');
      const muteLength = interaction.options.getString('duration');

      try{
        const guildMember = await interaction.guild.members.fetch(member.id);

        if (!guildMember) {
          interaction.reply(`The given member is not in the server!`)
      }

        if (!interaction.guild) {
          return interaction.reply('This command can only be used in a server.');
          }

          // Check if guild.members exists
  
      // Function to parse duration
      function parseDuration(duration) {
        const regex = /^(\d+)([mhd])$/ // Match number followed by 'm', 'h', or 'd'
        const match = duration.match(regex);

        if (!match) {
          return null; // Invalid format
          }

        const amount = parseInt(match[1]);
        const unit = match[2];

        let milliseconds;
        //Now we will be converting the given hours, minutes or seconds to miliseconds
        switch (unit) {
            case 'm': // Minutes to miliseconds
                milliseconds = amount * 60 * 1000;
                break;
            case 'h': // Hours to miliseconds
                milliseconds = amount * 60 * 60 * 1000;
                break;
            case 'd': // Days to miliseconds
                milliseconds = amount * 24 * 60 * 60 * 1000;
                break;
            default:
                return null;
        }

        return milliseconds;
    }

    const muteDuration = parseDuration(muteLength);

        if (!muteDuration) {
          return interaction.reply('Invalid duration! Use 1h, 10m, or 1d.');
        }

        await guildMember.timeout(muteDuration, 'Muted by bot')
            await interaction.reply(`${member.tag} has been muted for ${muteLength}`)

            setTimeout(async () => {
              await guildMember.timeout(null); // Removes the timeout
              interaction.followUp(`${member.tag} has been unmuted.`);
          }, muteDuration)


          }//curley bracket of try{}

        catch (error) {
          console.error('Error muting member:', error);

        // Check if an interaction reply was already sent
          if (interaction.replied || interaction.deferred) {
            await interaction.followUp('There was an error muting the member. Please try again!');
          } else {
            await interaction.reply('There was an error muting the member. Please try again!');
          }
          }

    }

    //Kick member
    if (interaction.commandName === 'kick'){
      const member = interaction.options.getUser('member');
      const guildMember= interaction.guild.members.cache.get(member.id);
      const kickReason= interaction.options.getString('reason');

      if (!guildMember) {
        interaction.reply(`The member is not in the server!`)
      }

      try {
        await guildMember.kick()
        interaction.reply(`${member.tag} has been kicked for ${kickReason}`)
      } catch (error){
        console.errot(error);
        await interaction.reply('There was an error while trying to kick this member!')
      }
    }
});