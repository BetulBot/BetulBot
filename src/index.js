const Discord = require("discord.js");
const client = new Discord.Client();
const initCustom = require("./handler/custom_handler").init;
const initCommands = require("./handler/command_handler").init;
const initEvents = require("./handler/event_handler").init;
const db = require("./database/db");

db.init("db.json");
global.prefix = "b!";

require("dotenv").config();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

initCustom();
initEvents(client);
initCommands(client);

client.login(process.env.BOT_TOKEN);