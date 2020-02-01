const Vote = require("../../structure/vote");
const DUtil = require("discord.js").Util;
const Command = require("../../structure/command");

const TIME = (2 * 60) * 1000; //Vote time (2 minutes)
const MAX_SIZE = 256000;

/*
    Create new emoji, executed after successful add vote
*/
function executeAddEmoji(msg, url, name) {
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
function startAddEmojiVote(msg, options, emojiName, url) {
    msg.channel.send(Command.prototype.mention(msg.author) + " started a vote to add following emoji:\n``:" + emojiName + ":``", options).then((message) => {
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
function addEmoji(msg, args) {

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
        if (parsedEmoji !== null && parsedEmoji.id !== null) {

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

module.exports = {
    executeAddEmoji: executeAddEmoji,
    startAddEmojiVote: startAddEmojiVote,
    addEmoji: addEmoji,
    MAX_SIZE: MAX_SIZE,
    TIME: TIME
};