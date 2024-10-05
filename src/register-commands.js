const { REST, Routes } = require('discord.js');
// const { options } = require('.');
const commands = [
  {
    name: 'hello',
    description: 'Replies with the name of your server!',
  },
  {
    name: 'serverinfo',
    description: 'Replies with the information of your server like name, number of memebrs etc.'
  },
  {
    name: 'ban',
    description: 'Bans the member permanentely',
    options:[{name:'member', type: 6, description: 'The member to ban.', require: true},]
  },
  {
    name: 'mute',
    description: 'mutes the member for specified amount of time',
    options: [{name:'member', type: 6, description: 'The member to mute.', require: true},
              {name: 'duration', type: 3, description: 'How long to mute?', require: true},
            ]
  }
];
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });    
  } catch (error) {
    console.error(error);
  }
})();