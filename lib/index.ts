#!/usr/bin/env node

import yargs from 'yargs';
const keypress = require('keypress');
import { korpus, geo, kratenki } from './cli';

const options = yargs
	.scriptName('rechnik')
	.usage('$0 <cmd> [args]')
	.command(
		'korpus [zbor] [strana]',
		'пребарајте го корпусот',
		(yargs) => {
			yargs.positional('zbor', {
				type: 'string',
				describe: 'зборот кој се пребарува',
			});

			yargs.positional('strana', {
				type: 'string',
				describe: 'бројот на страната на резултати',
			});
		},
		korpus
	)
	.command(
		'geo [zbor] [strana]',
		'пребарајте географски зборови',
		(yargs) => {
			yargs.positional('zbor', {
				type: 'string',
				describe: 'зборот кој се пребарува',
			});

			yargs.positional('strana', {
				type: 'string',
				describe: 'бројот на страната на резултати',
			});
		},
		geo
	)
	.command(
		'kratenki [zbor] [strana]',
		'пребарајте кратенки',
		(yargs) => {
			yargs.positional('zbor', {
				type: 'string',
				describe: 'кратенката која се пребарува',
			});

			yargs.positional('strana', {
				type: 'string',
				describe: 'бројот на страната на резултати',
			});
		},
		kratenki
	)
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
