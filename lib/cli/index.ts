import yargs from 'yargs';
import inquirer, { Answers, ChoiceCollection, ListChoiceMap } from 'inquirer';
import chalk from 'chalk';
import {
	searchCorpus,
	searchGeo,
	searchAbbreviations,
	getPage,
	DefinitionPage,
	SearchFunction,
} from '../api';
import { cammilify } from '../utils';
const clear = require('clear');

type ArgsType = yargs.Arguments<{ zbor: string; strana: number }>;

export const searchCommon = async (
	args: ArgsType,
	searchFn: SearchFunction,
	noContent?: boolean
) => {
	let page = 1;
	let answers: Answers = [];

	do {
		const res = await searchFn(args.zbor, page);

		clear();

		let choices: ChoiceCollection = [
			...res.words.map((r) => ({
				name: `${chalk.cyan(r.value)} ${
					r.desc ? chalk.gray(`(${r.desc})`) : ''
				}`,
				value: r.value,
			})),
		];

		if (page !== 1)
			choices = [{ name: 'Претходна страна...', value: 'prev' }, ...choices];
		if (page !== res.pages[1])
			choices = [...choices, { name: 'Следна страна...', value: 'next' }];

		answers = await inquirer.prompt([
			{
				type: 'rawlist',
				name: 'page',
				message: 'Кој збор би сакале да го посетите?',
				choices,
			},
		]);

		const isPaginate: boolean = ['prev', 'next'].includes(answers.page);

		if (noContent && !isPaginate) {
			console.error(chalk.red('Изворот кој го побаравте не содржи дефиниција'));
			process.exit(1);
		}

		if (isPaginate) page += answers.page === 'prev' ? -1 : 1;
	} while (!answers.length && ['prev', 'next'].includes(answers.page));

	clear();

	const {
		word,
		type,
		example,
		content,
		original,
	}: DefinitionPage = await getPage(answers.page);

	console.log(
		`${chalk.bold(cammilify(word))}\n` +
			`Вид: ${chalk.green(type)}\n` +
			`Пример: ${example ? chalk.yellow(example) : chalk.gray('Нема')}\n\n` +
			`${chalk.blueBright(content)}\n\n` +
			chalk.gray(`Оригинални податоци:\n${original}`)
	);
};

export const korpus = async (args: ArgsType) =>
	searchCommon(args, searchCorpus);

export const geo = async (args: ArgsType) => searchCommon(args, searchGeo);

export const kratenki = async (args: ArgsType) =>
	searchCommon(args, searchAbbreviations, true);
