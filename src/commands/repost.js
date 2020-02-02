const Command = require("../structure/command");
const DPermissions = require("discord.js").Permissions;

class RepostCommand extends Command {

    usage;

    constructor(name, options) {
        super(name, options);
        this.setUsage([
            ["<Text>", "Text which should be reposted"],
            ["", "Usage help"]
        ]);
    }

    check(msg) {

        return (msg.content.startsWith(global.prefix + this.commandName));

    }

    available(msg) {
        //First check if default available is true (If this is executed on a server)
        if (super.available(msg)) {

            //Check permission
            return this.checkPermission(msg, DPermissions.FLAGS.MANAGE_MESSAGES);

        } else {

            return false;

        }
    }

    execute(msg) {

        if (msg.content !== global.prefix + this.commandName) {

            var message = msg.content.substr((global.prefix + this.commandName).length, msg.content.length).trim();

            if (message != "") {
                msg.channel.send(message);
            } else {
                msg.reply(this.usage);
            }

        } else {
            msg.reply(this.usage);
        }

    }

}

module.exports = RepostCommand;