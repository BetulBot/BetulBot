const BEvent = require("../structure/event");
const db = require("../database/db");

class CounterEvent extends BEvent {

    constructor(name) {
        super(name);
    }

    execute(msg) {

        db.increaseUserData(msg.author.id, "sentMessages");

    }

}

module.exports = CounterEvent;