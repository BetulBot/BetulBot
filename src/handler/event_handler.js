/*
    This function returns all events that
    should be registered
*/
function getEvents() {

    var events = [];

    events.push(new(require("../events/counter"))("counter"));

    return events;

}

/*
    Message event for discord client
    This function executes the events
*/
function addMessageEvent(client, events) {

    client.on("message", message => {

        /*
            Go through the events and execute each
        */
        events.forEach((event) => {

            event.execute(message);

        });

    });

}

function initCommands(client) {

    const events = getEvents();
    addMessageEvent(client, events);

}

module.exports = {
    init: initCommands,
    get: getEvents
};