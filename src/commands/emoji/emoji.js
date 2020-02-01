const Command = require("../../structure/command");
const DPermissions = require("discord.js").Permissions;

const add = require("./add");
const remove = require("./remove");

class EmojiCommand extends Command {

    usage;

    constructor(name, options) {
        super(name, options);
        /*
        this.usage = [
            "```",
            "- " + global.prefix + this.commandName + " add <emoji> - Start vote to add emoji",
            "- " + global.prefix + this.commandName + " remove <emoji> - Start vote to remove emoji",
            "- " + global.prefix + this.commandName + " - Usage help",
            "When adding you can either upload a image and enter the name as emoji or use an emoji from an other server",
            "```"
        ];
        */
        this.setUsage([
            ["add <emoji>", "Start vote to add emoji"],
            ["remove <emoji>", "Start vote to remove emoji"],
            ["", "Usage help"],
            "When adding you can either upload a image and enter the name as emoji or use an emoji from an other server"
        ]);
    }

    check(msg) {

        return (msg.content.startsWith(global.prefix + this.commandName));

    }

    available(msg) {
        //First check if default available is true (If this is executed on a server)
        if (super.available(msg)) {

            //Check permission
            return this.checkPermission(msg, DPermissions.FLAGS.MANAGE_EMOJIS);

        } else {

            return false;

        }
    }

    execute(msg) {

        //Check if this command is executed on a server
        if (this.checkServer(msg)) {

            //Check for arguments
            var args = msg.content.split(" ");

            if (args.length > 1) {

                if (args.length == 3) {

                    var command = args[1];

                    if (command === "add") {

                        //this.addEmoji(msg, args);
                        add.addEmoji(msg, args);

                    } else if (command === "remove") {

                        //this.removeEmoji(msg, args);
                        remove.removeEmoji(msg, args);

                    } else {

                        //Return usage if invalid command is given
                        msg.reply(this.usage);

                    }

                } else {

                    //Return usage if invalid length of arguments are given
                    msg.reply(this.usage);

                }

            } else {

                //Return usage if no arguments are given
                msg.reply(this.usage);

            }

        }
    }

}

module.exports = EmojiCommand;