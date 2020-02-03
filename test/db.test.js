/* eslint-disable no-undef */
const db = require("../src/database/db");
const fs = require("fs");

db.init("db_test.json", true);

test("db_test.json exists", () => {
    expect(fs.existsSync("db_test.json")).toEqual(true);
});

describe("data test USER", () => {

    beforeEach(() => {
        db.user.setUserData("500", "test", 50);
    });

    test("db.user.getUserData(\"500\", \"test\") should return 50", () => {
        expect(db.user.getUserData("500", "test")).toEqual(50);
    });

    test("db.user.increaseUserData(\"500\", \"test\") should increase value to 51", () => {

        db.user.increaseUserData("500", "test");
        expect(db.user.getUserData("500", "test")).toEqual(51);

    });

});

describe("data test SERVER", () => {

    beforeEach(() => {
        db.server.setServerData("500", "test", 50);
    });

    test("db.server.getServerData(\"500\", \"test\") should return 50", () => {
        expect(db.server.getServerData("500", "test")).toEqual(50);
    });

});