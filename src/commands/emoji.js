const Command = require("../structure/command");
const Vote = require("../structure/vote");
const DPermissions = require("discord.js").Permissions;
const DUtil = require("discord.js").Util;

class EmojiCommand extends Command {

    MAX_SIZE = 256000;
    TIME = (2 * 60) * 1000; //Vote time (2 minutes)

    usage;

    constructor(name, serveronly) {
        super(name, serveronly);
        this.usage = [
            "```",
            "- " + global.prefix + this.commandName + " add <emoji> - Start vote to add emoji",
            "- " + global.prefix + this.commandName + " remove <emoji> - Start vote to remove emoji",
            "- " + global.prefix + this.commandName + " - Usage help",
            "When adding you can either upload a image and enter the name as emoji or use an emoji from an other server",
            "```"
        ];
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

    /*
        Create new emoji, executed after successful add vote
    */
    executeAddEmoji(msg, url, name) {
        if (this.checkServer(msg)) {

            msg.guild.createEmoji(url, name).then((emoji) => {

                //Post success message with new added emoji
                msg.channel.send("Added new emoji: ``:" + emoji.name + ":`` " + emoji.toString());

            }).catch((error) => {
                msg.channel.send("Failed to add emoji ``:" + name + "``.");
                console.error(error);
            });

        }
    }

    /*
        Vote functionality for the add command
    */
    startAddEmojiVote(msg, options, emojiName, url) {
        msg.channel.send(this.mention(msg.author) + " started a vote to add following emoji:\n``:" + emojiName + ":``", options).then((message) => {
            //Start vote on message sent by the bot
            var vote = new Vote(message, this.TIME);

            vote.execute().then((result) => {

                if (result === true) {

                    //Voted for yes, add emoji
                    this.executeAddEmoji(msg, url, emojiName);

                } else if (result === false) {

                    //Voted for no, don't add emoji
                    msg.channel.send("Vote result for adding emoji ``:" + emojiName + ":``: 👎");

                } else if (result === null) {

                    //No result, don't add emoji
                    msg.channel.send("Vote result for adding emoji ``:" + emojiName + ":``: 👎");

                }

            });

        });
    }

    /*
        Main functionality for the add command
    */
    addEmoji(msg, args) {

        //Check for attachment
        if (msg.attachments.size == 1) {

            //Found attachment now need to check if valid

            var attachment = msg.attachments.first();

            //Check file size
            if (attachment.filesize < this.MAX_SIZE) {

                //File size is okay, check if it's an image

                if (attachment.width !== undefined && attachment.height !== undefined) {

                    var emojiName = args[2];

                    this.startAddEmojiVote(msg, {
                        files: [{
                            attachment: attachment.url,
                            name: attachment.fileName
                        }]
                    }, emojiName, attachment.url);

                } else {
                    msg.reply("This file isn't an image. Please use an image.");
                }

            } else {

                msg.reply("This file can't be used because it's too big. I'm sorry.");

            }

        } else {

            //Didn't find any attachment, check if valid emoji is given
            var emoji = args[2];
            var parsedEmoji = DUtil.parseEmoji(emoji);

            //Check if parsed emoji exists
            if (parsedEmoji.id !== null) {

                //Check if emoji is from this server
                if (!msg.guild.emojis.has(parsedEmoji.id)) {

                    var fileName = parsedEmoji.id + (parsedEmoji.animated ? ".gif" : ".png");
                    var url = "https://cdn.discordapp.com/emojis/" + fileName + "?v=1";

                    this.startAddEmojiVote(msg, {
                        files: [{
                            attachment: url,
                            name: fileName
                        }]
                    }, parsedEmoji.name, url);

                } else {
                    msg.reply("You can't add emojis from this server to this server.");
                }

            } else {

                msg.reply("Invalid emoji.");

            }


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

                        this.checkPermission(msg, DPermissions.FLAGS.MANAGE_EMOJIS).then((has) => {

                            if (has) {

                                this.addEmoji(msg, args);

                            } else {

                                msg.reply("I'm sorry but you need the permission ``" + "MANAGE_EMOJIS" + "`` to execute this command.");

                            }

                        }).catch(console.error);

                    } else if (command === "remove") {

                        this.checkPermission(msg, DPermissions.FLAGS.MANAGE_EMOJIS).then((has) => {

                            if (has) {

                                msg.reply("**FUNCTION WORK IN PROGRESS**");

                            } else {

                                msg.reply("I'm sorry but you need the permission ``" + "MANAGE_EMOJIS" + "`` to execute this command.");

                            }

                        }).catch(console.error);

                    } else {

                        //Return usage if invalid command is given
                        msg.reply(this.usage.join("\n"));

                    }

                } else {

                    //Return usage if invalid length of arguments are given
                    msg.reply(this.usage.join("\n"));

                }

            } else {

                //Return usage if no arguments are given
                msg.reply(this.usage.join("\n"));

            }

        }
    }

}

module.exports = EmojiCommand;