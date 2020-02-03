const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

let adapter;
let db;

function init(fileName) {

    adapter = new FileSync(fileName);
    db = low(adapter);

    db.defaults({
        users: [],
        guilds: []
    }).write();

    //Load user db functions
    module.exports.user = require("./user_db")(db);

    //Load server db functions
    module.exports.server = require("./server_db")(db);

}

module.exports = {
    init: init,
    db: db
};