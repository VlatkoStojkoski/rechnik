#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var keypress = require('keypress');
var cli_1 = require("./cli");
var options = yargs_1.default
    .scriptName('rechnik')
    .usage('$0 <cmd> [args]')
    .command('korpus [zbor] [strana]', 'пребарајте го корпусот', function (yargs) {
    yargs.positional('zbor', {
        type: 'string',
        describe: 'зборот кој се пребарува',
    });
    yargs.positional('strana', {
        type: 'string',
        describe: 'бројот на страната на резултати',
    });
}, cli_1.korpus)
    .command('geo [zbor] [strana]', 'пребарајте географски зборови', function (yargs) {
    yargs.positional('zbor', {
        type: 'string',
        describe: 'зборот кој се пребарува',
    });
    yargs.positional('strana', {
        type: 'string',
        describe: 'бројот на страната на резултати',
    });
}, cli_1.geo)
    .command('kratenki [zbor] [strana]', 'пребарајте кратенки', function (yargs) {
    yargs.positional('zbor', {
        type: 'string',
        describe: 'кратенката која се пребарува',
    });
    yargs.positional('strana', {
        type: 'string',
        describe: 'бројот на страната на резултати',
    });
}, cli_1.kratenki)
    .help().argv;
// // make `process.stdin` begin emitting "keypress" events
// keypress(process.stdin);
// // listen for the "keypress" event
// process.stdin.on('keypress', (ch, key) => {
// 	console.log('got "keypress"', key);
// 	// left code [D
// 	// right code [C
// 	if (key && key.ctrl && key.name == 'c') {
// 		process.stdin.pause();
// 	}
// });
// process.stdin.setRawMode(true);
// process.stdin.resume();
