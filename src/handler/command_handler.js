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

        let executeCommand;

        /*
            Go through the commands and check for each
            if it should be executed or not
        */
        commands.forEach((command) => {

            if (command.check(message)) {

                if(!executeCommand)executeCommand = command;

            }

        });

        //Check if it found a command to execute
        if(executeCommand){

            executeCommand.execute(message);

        }

    });

}

function initCommands(client) {

    const commands = getCommands();
    addMessageEvent(client, commands);

}

module.exports = initCommands;