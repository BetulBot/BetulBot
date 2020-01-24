const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
    users: []
}).write();

/*
    Function to save some user data
*/
function setUserData(id, name, value) {

    //Check if exists
    if (db.get("users").find({ "id": id }).value() !== undefined) {

        //User exists, overwrite data
        db.get("users").find({ "id": id }).update(name, () => value).write();

    } {

        //User doesn't exist, add user
        var user = {};
        user["id"] = id;
        user[name] = value;

        db.get("users").push(user).write();

    }

}

/*
    Function to increase some user data value
*/
function increaseUserData(id, name) {

    //Check if exists
    if (db.get("users").find({ "id": id }).value() !== undefined) {

        //User exists, overwrite data
        db.get("users").find({ "id": id }).update(name, value => value + 1).write();

    } else {

        //User doesn't exist, add user
        var user = {};
        user["id"] = id;
        user[name] = 1;

        db.get("users").push(user).write();

    }

}

module.exports = {
    setUserData: setUserData,
    increaseUserData: increaseUserData
};