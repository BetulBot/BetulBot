const PingCommand = require("../commands/PingCommand");

/*
    This function returns all commands that
    should be registered
*/
function getCommands() {

    var commands = [];

    commands.push(new PingCommand("ping"));

    return commands;

}

/*

*/
function addMessageEvent(client, commands) {

    client.on("message", message => {

        /*
            Go through the commands and check for each
            if it should be executed or not and execute them then
        */
        commands.forEach((command) => {

            if (command.check(message)) {

                command.execute(message);

            }

        });

    });

}

function initCommands(client) {

    const commands = getCommands();
    addMessageEvent(client, commands);

}

module.exports = initCommands;