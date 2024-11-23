#!/usr/bin/env node

const { program } = require("commander");
const clc = require("cli-color");
const { customizeDefault } = require("./utils/customizeDefault");
const checkCommand = require("./commands/checkCommand");
const helpCommand = require("./commands/helpCommand");

program.name("codecare");
program.version(
  clc.greenBright(
    program.name() + " CLI version:" + " v" + require("./package.json").version
  )
);

customizeDefault(program);
checkCommand();
helpCommand();

program.parse(process.argv);
