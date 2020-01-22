/* eslint-disable no-undef */
const Command = require("../src/structure/command");

global.prefix = "b!";
var command = new Command("test");

test(".commandName exists", () => {
    expect(command.commandName).not.toEqual(undefined);
});

test(".commandName equals test", () => {
    expect(command.commandName).toEqual("test");
});

test(".check() exists", () => {
    expect(command.check).not.toEqual(undefined);
});

//Test with no parameter
test(".check() returns false", () => {
    expect(command.check()).toEqual(false);
});

var dummyMessage = {
    content: "b!test"
};

//Test with correct content
test(".check(dummyMessage) returns true", () => {
    expect(command.check(dummyMessage)).toEqual(true);
});

var secondDummyMessage = {
    content: "b!testt"
};

//Test with wrong content
test(".check(secondDummyMessage) returns false", () => {
    expect(command.check(secondDummyMessage)).toEqual(false);
});