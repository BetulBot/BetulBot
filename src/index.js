const Discord = require("discord.js");
const client = new Discord.Client();
const initCommands = require("./handler/command_handler").init;
const initEvents = require("./handler/event_handler").init;

global.prefix = "b!";

require("dotenv").config();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

initEvents(client);
initCommands(client);

client.login(process.env.BOT_TOKEN);