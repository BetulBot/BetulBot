const Command = require("../src/structure/command");

/*
    Visit https://github.com/BetulBot/BetulBot/blob/master/src/structure/command.js to
    see how the Command class is built
*/
class ExampleCommand extends Command {

    constructor() {
        //Set commandName to customExample and set serveronly to true
        //Visit Command class constructor for more information 
        super("customExample", {
            serveronly: true //This option sets that the command should only be executeable on servers
        });
        //this.forceExample = true; //Uncomment this line to register this example command
    }

    /*
        Check if command should be executed
    */
    check(msg) {
        return super.check(msg); //Return default value
    }

    /*
        Check if command is available
    */
    available(msg) {
        return super.available(msg); //Return default value
    }

    /*
        Visit https://discord.js.org/#/docs/main/stable/class/Message to
        see how to use the msg variable
    */
    execute(msg) {
        //Reply author with Hello World
        msg.reply("Hello World");
    }

}

//Export command
module.exports = ExampleCommand;