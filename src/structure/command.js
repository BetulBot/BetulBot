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

    /*
        Executes the command
        Default: Reply with success message

        Visit https://discord.js.org/#/docs/main/stable/class/Message for more information
    */
    execute(message) {

        message.reply("You've successfully executed the command " + this.commandName);

    }

}

module.exports = Command;