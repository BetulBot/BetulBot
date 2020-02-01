const Vote = require("../../structure/vote");
const DUtil = require("discord.js").Util;
const Command = require("../../structure/command");

const TIME = (2 * 60) * 1000; //Vote time (2 minutes)

function executeRemoveEmoji(msg, emoji) {
    if (this.checkServer(msg)) {

        msg.guild.deleteEmoji(emoji.id, "Vote").then(() => {

            //Post success message with removed emoji
            msg.channel.send("Removed emoji: ``:" + emoji.name + ":``");

        }).catch((error) => {
            msg.channel.send("Failed to remove emoji ``:" + emoji.name + "``.");
            console.error(error);
        });

    }
}

function startRemoveEmojiVote(msg, options, emojiName, url, emoji) {
    msg.channel.send(Command.prototype.mention(msg.author) + " started a vote to remove following emoji:\n``:" + emojiName + ":``", options).then((message) => {
        //Start vote on message sent by the bot
        var vote = new Vote(message, this.TIME);

        vote.execute().then((result) => {

            if (result === true) {

                //Voted for yes, add emoji
                this.executeRemoveEmoji(msg, emoji);

            } else if (result === false) {

                //Voted for no, don't remove emoji
                msg.channel.send("Vote result for removing emoji ``:" + emojiName + ":``: 👎");

            } else if (result === null) {

                //No result, don't remove emoji
                msg.channel.send("Vote result for removing emoji ``:" + emojiName + ":``: 👎");

            }

        });

    });
}

function removeEmoji(msg, args) {

    var emoji = args[2];
    var parsedEmoji = DUtil.parseEmoji(emoji);

    //Check if parsed emoji exists
    if (parsedEmoji !== null && parsedEmoji.id !== null) {

        //Check if emoji is from this server
        if (msg.guild.emojis.has(parsedEmoji.id)) {

            var fileName = parsedEmoji.id + (parsedEmoji.animated ? ".gif" : ".png");
            var url = "https://cdn.discordapp.com/emojis/" + fileName + "?v=1";

            this.startRemoveEmojiVote(msg, {
                files: [{
                    attachment: url,
                    name: fileName
                }]
            }, parsedEmoji.name, url, parsedEmoji);

        } else {
            msg.reply("You can't remove emojis from other servers.");
        }

    } else {

        msg.reply("Invalid emoji.");

    }

}

module.exports = {
    executeRemoveEmoji: executeRemoveEmoji,
    startRemoveEmojiVote: startRemoveEmojiVote,
    removeEmoji: removeEmoji,
    TIME: TIME
};