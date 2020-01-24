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

}

/*
    Function to save some user data
*/
function setUserData(id, name, value) {

    //Check if exists
    if (db.get("users").find({ "id": id }).value() !== undefined) {

        //User exists, overwrite data
        db.get("users").find({ "id": id }).update(name, () => value).write();

    } else {

        //User doesn't exist, add user
        var user = {};
        user["id"] = id;
        user[name] = value;

        db.get("users").push(user).write();

    }

}

/*
    Function to get user data
*/
function getUserData(id, name) {

    var userObject = db.get("users").find({ "id": id }).value();
    if (userObject === undefined) return undefined;
    else return userObject[name];

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
    init: init,
    setUserData: setUserData,
    getUserData: getUserData,
    increaseUserData: increaseUserData
};