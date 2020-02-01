const Command = require("../structure/command");
const getCommands = require("../handler/command_handler").get;
const asyncUtils = require("../util/async");
const commandHandler = require("../handler/command_handler");

class HelpCommand extends Command {

    getAvailableCommands(msg) {

        var availableCommands = [];
        var commands = getCommands();

        const get = async () => {

            await asyncUtils.asyncForEach(commands, async (command) => {
                var available = command.available(msg);
                if (available instanceof Promise) {
                    await command.available(msg).then((pAvailable) => {
                        if (pAvailable === true) {
                            availableCommands.push(command);
                        }
                    });
                } else {
                    if (available) {
                        availableCommands.push(command);
                    }
                }

            });

            return availableCommands;

        };

        return get();

    }

    check(msg) {
        return (msg.content.startsWith(global.prefix + this.commandName));
    }

    execute(msg) {

        const { version } = require("../../package.json");


        //Check for arguments
        var args = msg.content.split(" ");

        if (args.length == 2) {

            var targetCommandName = args[1];
            var targetCommand = commandHandler.getCommandByName(targetCommandName);

            if (targetCommand !== undefined) {

                var commandUsage = targetCommand.usage;

                if (commandUsage !== undefined) {

                    msg.reply("Here is the usage of the command ``" + targetCommand.commandName + "``: \n" + commandUsage + "BetulBot v. " + version);

                } else {
                    msg.reply("There is no help for this command available.");
                }

            } else {

                msg.reply("This command does not exist.");

            }

        } else {
            var availableCommands = this.getAvailableCommands(msg);
            availableCommands.then((pAvailableCommands) => {
                pAvailableCommands = pAvailableCommands.map(command => "- " + global.prefix + command.commandName);

                //TODO: maybe add a description? (in Command class)
                msg.reply("Here is a list of all available commands: \n```\n" + pAvailableCommands.join("\n") + "```" + "BetulBot v. " + version);
            });
        }

    }

}

module.exports = HelpCommand;