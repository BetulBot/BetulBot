class Command {

    commandName

    /*
        name: Name of the command
    */
    constructor(name) {
        this.commandName = name;
    }

    /*
        Check if this command should be executed
        Default: executes command if message equals to prefix + command name

        Visit https://discord.js.org/#/docs/main/stable/class/Message for more information
    */
    check(message) {

        return (message.content === global.prefix + this.commandName);

    }

    /*
        Executes the command
        Default: Reply with success message

        Visit https://discord.js.org/#/docs/main/stable/class/Message for more information
    */
    execute(message) {

        message.reply("You've successfully executed the command " + this.commandName);

    }

    /*
        Function to check if message is sent on a server 
    */
    checkServer(message) {

        return (message.guild && message.guild.available);

    }

    /*
        Function to get a GuildMember object of a message's author
        Returns Promise<GuildMember>

        Reference: https://discord.js.org/#/docs/main/stable/class/Guild?scrollTo=fetchMember
    */
    getGuildMember(message) {

        //Obviously this function is only available on servers (guilds)
        if (this.checkServer(message)) {

            var guild = message.guild;

            return guild.fetchMember(message.author);

        } else {

            return null;

        }

    }

    /*
        Check if the message's author has a certain permission
        Returns Promise<boolean>

        Visit https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS for more information
        about permissions
    */
    checkPermission(message, permission) {

        //Obviously this function is also only available on servers
        if (this.checkServer(message)) {

            return new Promise((resolve, reject) => {

                this.getGuildMember(message).then((guildMember) => {

                    resolve(guildMember.permissions.has(permission));

                }).then(error => reject(error));

            });

        } else {

            return null;

        }

    }

    /*
        Simple function to get the mention string from a user
    */
    mention(author) {
        if (author.id) {
            return "<@" + author.id + ">";
        } else {
            return "";
        }
    }

}

module.exports = Command;