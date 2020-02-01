class Vote {

    message;

    time;

    /*
        Requires a message to start the vote for and
        the time duration of the vote
    */
    constructor(message, time) {

        this.message = message;
        this.time = time;

    }

    /*
        Start the vote process
    */
    execute() {

        return new Promise((resolve, reject) => {

            //Add thumb up emoji and after success add thumb down emoji
            //Did it this way to have the right order
            this.message.react("👍").then(() => {

                this.message.react("👎").then(() => {

                    //Filter 
                    const filter = ((reaction, user) => {

                        //Check if the right emojis are used
                        var isRightEmoji = (reaction.emoji.name === "👍" || reaction.emoji.name === "👎");

                        //Don't count the votes from the author (the bot)
                        return isRightEmoji && (user != this.message.author);

                    });

                    //Options for the collector
                    const collectorOptions = {
                        time: this.time
                    };

                    const collector = this.message.createReactionCollector(filter, collectorOptions);

                    //Event for after the time ran out
                    collector.on("end", (collected) => {

                        let upvotes = 0,
                            downvotes = 0;

                        //Get up- and downvote count
                        collected.forEach(reaction => {

                            if (reaction._emoji.name === "👍")
                                upvotes = reaction.count - (reaction.me ? 1 : 0);

                            if (reaction._emoji.name === "👎")
                                downvotes = reaction.count - (reaction.me ? 1 : 0);

                        });

                        //Get result
                        if (upvotes > downvotes) { //Votes for yes
                            resolve(true);
                        } else if (downvotes > upvotes) { //Voted for no
                            resolve(false);
                        } else if (upvotes === downvotes) { //No result
                            resolve(null);
                        }

                    });

                }).catch((error) => reject(error));

            }).catch((error) => reject(error));

        });

    }

}

module.exports = Vote;