require("dotenv").config();//Loading .env
const fs = require("fs");
const { Collection, Client } = require("discord.js");

const client = new Client();//Making a discord bot client
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()

client.config = {
  prefix: process.env.PREFIX
}
client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.);
  // Example of changing the bot's playing game to something useful. client.user is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(in ${client.guilds.cache.size} servers X-SPEED);
});
//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

client.login(process.env.TOKEN)
