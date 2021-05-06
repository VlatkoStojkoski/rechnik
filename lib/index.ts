#!/usr/bin/env node

import yargs from 'yargs';

const options = yargs
	.scriptName('rechnik')
	.usage('$0 <cmd> [args]')
	.command('korpus [zbor]', 'пребарајте го корпусот', (yargs) => {
		yargs.positional('zbor', {
			type: 'string',
			describe: 'зборот кој се пребарува',
		});
	})
	.help().argv;
