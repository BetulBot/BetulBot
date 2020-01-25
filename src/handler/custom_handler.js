const fs = require("fs");
const path = require("path");

const Command = require("../structure/command");
const Event = require("../structure/event");

var customCommands = [];
var customEvents = [];

function getCommands() {
    return customCommands;
}

function getEvents() {
    return customEvents;
}

function getCustomContent() {

    let commands = [];
    let events = [];

    //Check if custom folder exists
    var customPath = path.join(__dirname, "..", "..", "custom");

    if (fs.existsSync(customPath)) {

        //Check for files
        var files = fs.readdirSync(customPath);

        if (files.length > 0) {

            files.forEach((file) => {

                //Check if js file
                if (file.endsWith(".js")) {

                    var filePath = path.join(customPath, file);

                    //Check for type
                    try {
                        var req = new(require(filePath))();

                        if (req instanceof Command) {

                            console.log("[Custom] Registered custom command: " + req.commandName);
                            commands.push(req);

                        } else if (req instanceof Event) {

                            console.log("[Custom] Registered custom event: " + req.eventName);
                            events.push(req);

                        }
                    } catch (e) {
                        undefined;
                    }

                }

            });

        }

    }

    customCommands = commands;
    customEvents = events;

}

function init() {

    getCustomContent();

}

module.exports = {
    init: init,
    getCommands: getCommands,
    getEvents: getEvents
};