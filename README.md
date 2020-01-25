# BetulBot

![build](https://travis-ci.com/BetulBot/BetulBot.svg?branch=master "Build")

## Installation

#### Clone the repo
Run `git clone https://github.com/BetulBot/BetulBot.git` in your terminal to get a local copy of the repository.

#### Install dependencies
In order to install the dependencies you need to navigate in the project folder.
You can do that with the command `cd BetulBot`. Now that you are in the project folder you can run `npm install` and the dependencies will be installed.

#### Setup
Create a .env file with your discord bot token. This can be done with the command
`echo "BOT_TOKEN=<TOKEN>" > .env`. 

Visit the [Discord Developer Portal](https://discordapp.com/developers/applications/) to create a bot account and to get your bot token.

#### Running
After everything's set up, you can start the bot with the command `node .` or `npm start`

## Configuration

The bot uses the environment variable BOT_TOKEN to set the token.

You can use [dotenv](https://github.com/motdotla/dotenv) to set the environment variable locally.

Just create a .env file in the root directory of the project and enter there your bot token in the following format
```
BOT_TOKEN=INSERT-YOUR-TOKEN-HERE
```
You can take a look at the example file here: [.env.example](https://github.com/BetulBot/BetulBot/blob/readme-update/.env.example)

# Dependencies

- [discord.js](https://github.com/discordjs/discord.js/) for interaction with the discord api
- [lowdb](https://github.com/typicode/lowdb) as database
- [Jest](https://github.com/facebook/jest) for unit testing

## Coding Style
The project uses [ESLint](https://github.com/eslint/eslint) and the VS Code extension [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) to enforce a coding style.

You can use `npm t` to run ESLint
