const { REST, Routes } = require('discord.js');
const commands = [
  {
    name: 'hello',
    description: 'Replies with the name of your server!',
  },
  {
    name: 'serverinfo',
    description: 'Replies with the information of your server like name, number of memebrs etc.'
  },
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