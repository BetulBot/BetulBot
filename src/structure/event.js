class BEvent {

    eventName;

    constructor(name) {
        this.eventName = name;
    }

    execute(message) {

        console.log(this.eventName + " triggered by " + message.author.name);

    }

}

module.exports = BEvent;