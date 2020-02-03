const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

let adapter;
let db;

function init(fileName) {

    adapter = new FileSync(fileName);
    db = low(adapter);

    db.defaults({
        users: []
    }).write();

    //Load user db functions
    module.exports.user = require("./user_db")(db);

}

module.exports = {
    init: init,
    db: db
};