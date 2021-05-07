#!/usr/bin/env node

import yargs from 'yargs';
import { korpus, geo, kratenki } from './cli';

const options = yargs
	.scriptName('rechnik')
	.usage('$0 <cmd> [args]')
	.command(
		'korpus [zbor]',
		'пребарајте го корпусот',
		(yargs) => {
			yargs.positional('zbor', {
				type: 'string',
				describe: 'зборот кој се пребарува',
			});
		},
		korpus
	)
	.command(
		'geo [zbor]',
		'пребарајте географски зборови',
		(yargs) => {
			yargs.positional('zbor', {
				type: 'string',
				describe: 'зборот кој се пребарува',
			});
		},
		geo
	)
	.command(
		'kratenki [zbor]',
		'пребарајте кратенки',
		(yargs) => {
			yargs.positional('zbor', {
				type: 'string',
				describe: 'кратенката која се пребарува',
			});
		},
		kratenki
	)
	.help().argv;
