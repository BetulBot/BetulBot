let db;

function setServerData(id, name, value) {

    //Check if exists
    if (db.get("guilds").find({ "id": id }).value() !== undefined) {

        //Guild exists, overwrite data
        db.get("guilds").find({ "id": id }).update(name, () => value).write();

    } else {

        //Guild doesn't exist, add guild
        var guild = {};
        guild["id"] = id;
        guild[name] = value;

        db.get("guilds").push(guild).write();

    }

}

/*
    Function to get server data
*/
function getServerData(id, name) {
    var guildObject = db.get("guilds").find({ "id": id }).value();
    if (guildObject === undefined) return undefined;
    else return guildObject[name];
}

module.exports = (_db) => {
    db = _db;

    return {
        setServerData: setServerData,
        getServerData: getServerData
    };
};