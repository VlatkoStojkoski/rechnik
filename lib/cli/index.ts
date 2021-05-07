import yargs from 'yargs';
import inquirer from 'inquirer';
import { searchCorpus, searchGeo, searchAbbreviations } from '../api';

type ArgsType = yargs.Arguments<{ zbor: string; strana: number }>;

const prompt = inquirer.createPromptModule();

export const korpus = async (args: ArgsType) => {
	const res = await searchCorpus(args.zbor, args.strana);

	const prompt = inquirer.createPromptModule();

	const answers = await prompt([
		{
			type: 'rawlist',
			name: 'page',
			message: 'Кој збор би сакале да го посетите?',
			choices: res.map((r) => ({ name: r.value, value: r.desc })),
		},
	]);

	console.log(answers);

	console.log(res);
};

export const geo = async (args: ArgsType) => {
	const res = await searchGeo(args.zbor, args.strana);

	console.log(res);
};

export const kratenki = async (args: ArgsType) => {
	const res = await searchAbbreviations(args.zbor, args.strana);

	console.log(res);
};
