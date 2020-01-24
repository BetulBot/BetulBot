/* eslint-disable no-undef */
const db = require("../src/database/db");
const fs = require("fs");

db.init("db_test.json", true);

test("db_test.json exists", () => {
    expect(fs.existsSync("db_test.json")).toEqual(true);
});

describe("data test", () => {

    beforeEach(() => {
        db.setUserData("500", "test", 50);
    });

    test("db.getUserData(\"500\", \"test\") should return 50", () => {
        expect(db.getUserData("500", "test")).toEqual(50);
    });

    test("db.increaseUserData(\"500\", \"test\") should increase value to 51", () => {

        db.increaseUserData("500", "test");
        expect(db.getUserData("500", "test")).toEqual(51);

    });

});