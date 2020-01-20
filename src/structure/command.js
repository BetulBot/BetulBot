class Command {

    commandName

    /*
        name: Name of the command
    */
    constructor(name) {
        this.commandName = name;
    }

    /*
        Check if this command should be executed
        Default: executes command if message equals to prefix + command name

        Visit https://discord.js.org/#/docs/main/stable/class/Message for more information
    */
    check(message) {

        return (message.content === global.prefix + this.commandName);

    }

}

module.exports = Command;