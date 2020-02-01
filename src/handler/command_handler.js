const asyncUtils = require("../util/async");
const Command = require("../structure/command");
const customCommands = require("../handler/custom_handler").getCommands;

/*
    This function returns all commands that
    should be registered
*/
function getCommands() {

    var commands = [];

    commands.push(new(require("../commands/help"))("help"));
    commands.push(new(require("../commands/ping"))("ping"));
    commands.push(new(require("../commands/emoji/emoji"))("emoji", true));

    //Add custom commands
    customCommands().forEach((c) => commands.push(c));

    return commands;

}

function getExecuteCommand(message, commands) {

    const get = async () => {

        let executeCommand;

        await asyncUtils.asyncForEach(commands, async (command) => {
            var available = command.available(message);
            if (available instanceof Promise) {
                await command.available(message).then((pAvailable) => {
                    if (pAvailable === true) {

                        //If available check if it should be executed
                        if (command.check(message)) {

                            if (!executeCommand) executeCommand = command;

                        }

                    }
                });
            } else {
                if (available) {

                    //If available check if it should be executed
                    if (command.check(message)) {

                        if (!executeCommand) executeCommand = command;

                    }

                }
            }

        });

        return executeCommand;

    };

    return get();

}

/*
    Message event for discord client
    This function executes the commands
*/
function addMessageEvent(client, commands) {

    client.on("message", message => {

        let executeCommand = getExecuteCommand(message, commands);

        //Check if it found a command to execute
        if (executeCommand) {

            executeCommand.then((command) => {

                if (command instanceof Command) {

                    command.execute(message);

                }

            });

        }

    });

}

function initCommands(client) {

    const commands = getCommands();
    addMessageEvent(client, commands);

}

module.exports = {
    init: initCommands,
    get: getCommands
};