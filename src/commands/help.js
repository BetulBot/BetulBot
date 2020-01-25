const Command = require("../structure/command");
const getCommands = require("../handler/command_handler").get;
const asyncUtils = require("../util/async");

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

    execute(msg) {

        var availableCommands = this.getAvailableCommands(msg);
        availableCommands.then((pAvailableCommands) => {
            pAvailableCommands = pAvailableCommands.map(command => "- " + global.prefix + command.commandName);

            //TODO: maybe add a description? (in Command class)
            msg.reply("Here is a list of all available commands: \n```\n" + pAvailableCommands.join("\n") + "```");
        });

    }

}

module.exports = HelpCommand;