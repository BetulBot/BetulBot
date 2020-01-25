const Command = require("../src/structure/command");

/*
    Visit https://github.com/BetulBot/BetulBot/blob/master/src/structure/command.js to
    see how the Command class is built
*/
class ExampleCommand extends Command {

    constructor() {
        //Set commandName to customExample and set serveronly to true
        //Visit Command class constructor for more information 
        super("customExample", true);
        //this.forceExample = true; //Uncomment this line to register this example command
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