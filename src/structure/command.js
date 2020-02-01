class Command {

    commandName

    options

    /*
        name: Name of the command
        [options]: 
            - serveronly (boolean) - Should this command only be executeable on servers? Default: false 
    */
    constructor(name, options) {

        this.commandName = name;

        if (options !== undefined) {
            this.options = options;
        } else {
            this.options = {
                serveronly: false
            };
        }

    }

    /*
        Check if this command should be executed
        Default: executes command if message equals to prefix + command name

        Visit https://discord.js.org/#/docs/main/stable/class/Message for more information
    */
    check(message) {

        return (message ? message.content === global.prefix + this.commandName : false);

    }

    /*
        Check if this command is available
    */
    available(message) {

        return (this.options.serveronly ? this.checkServer(message) : true);

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
        Function to set usage for this command
        
        Example:

        this.setUsage([
            ["command", "Description"],
            ["command <argument>", "Description"],
            ["", "Usage help"],
            "Some general information about command"
        ]);

    */
    setUsage(usage) {

        var usageString = "```\n";

        usage.forEach(command => {
            if (typeof(command) === "object") {
                var cmd = (command[0] != "" ? " " + command[0].trim() : "");
                usageString += "- " + global.prefix + this.commandName + cmd + " - " + command[1].trim() + "\n";
            } else {
                usageString += command + "\n";
            }
        });

        usageString += "```";

        this.usage = usageString;

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