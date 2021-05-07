#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var cli_1 = require("./cli");
var options = yargs_1.default
    .scriptName('rechnik')
    .usage('$0 <cmd> [args]')
    .command('korpus [zbor]', 'пребарајте го корпусот', function (yargs) {
    yargs.positional('zbor', {
        type: 'string',
        describe: 'зборот кој се пребарува',
    });
}, cli_1.korpus)
    .command('geo [zbor]', 'пребарајте географски зборови', function (yargs) {
    yargs.positional('zbor', {
        type: 'string',
        describe: 'зборот кој се пребарува',
    });
}, cli_1.geo)
    .command('kratenki [zbor]', 'пребарајте кратенки', function (yargs) {
    yargs.positional('zbor', {
        type: 'string',
        describe: 'кратенката која се пребарува',
    });
}, cli_1.kratenki)
    .help().argv;
