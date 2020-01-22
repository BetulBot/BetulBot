const Command = require("../structure/command");

class PingCommand extends Command {

    execute(msg) {

        msg.reply("Pong!");

    }

}

module.exports = PingCommand;