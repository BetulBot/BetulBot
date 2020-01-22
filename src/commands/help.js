const Command = require("../structure/command");
const getCommands = require("../handler/command_handler").get;

class HelpCommand extends Command {

    execute(msg) {

        var commands = getCommands();
        commands = commands.map(command => "- " + global.prefix + command.commandName);

        //TODO: maybe add a description? (in Command class)
        msg.reply("Here is a list of all available commands: \n```\n" + commands.join("\n") + "```");

    }

}

module.exports = HelpCommand;