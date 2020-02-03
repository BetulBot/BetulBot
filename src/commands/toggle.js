const Command = require("../structure/command");
const DPermissions = require("discord.js").Permissions;
const commandHandler = require("../handler/command_handler");
const db = require("../database/db");

class ToggleCommand extends Command {

    usage;

    constructor(name, options) {
        super(name, options);
        this.setUsage([
            ["<Command>", "Command which should be enabled/disabled"],
            ["", "Usage help"]
        ]);
    }

    check(msg) {

        return (msg.content.startsWith(global.prefix + this.commandName));

    }

    available(msg) {
        if (super.available(msg)) {

            //Check permission
            return this.checkChannelPermission(msg, DPermissions.FLAGS.ADMINISTRATOR);

        } else {

            return false;

        }
    }

    execute(msg) {

        let args = msg.content.split(" ");

        if (args.length == 2) {

            var targetCommandName = args[1];
            var targetCommand = commandHandler.getCommandByName(targetCommandName);

            if (targetCommand !== undefined) {

                var name = targetCommand.commandName;

                var oldValue = db.server.getServerData(msg.guild.id, "command_" + name + "_enabled");
                let newValue;

                if (targetCommand.options.default_disabled) {
                    newValue = (oldValue === true ? false : true);
                } else {
                    newValue = (oldValue !== false ? false : true);
                }

                db.server.setServerData(msg.guild.id, "command_" + name + "_enabled", newValue);

                if (newValue) {
                    msg.reply("Enabled command ``" + name + "``");
                } else {
                    msg.reply("Disabled command ``" + name + "``");
                }

            } else {

                msg.reply("This command does not exist.");

            }

        } else {

            msg.reply(this.usage);

        }

    }

}

module.exports = ToggleCommand;