import axios from 'axios';
import chalk from 'chalk';
import cheerio from 'cheerio';
import { cleanString } from '../utils';

axios.defaults.baseURL = 'https://makedonski.gov.mk';

export interface SearchResults {
	words: {
		value: string;
		desc: string;
	}[];
	pages: [curr: number, max: number];
}

export type SearchFunction = (
	query: string,
	page?: number
) => Promise<SearchResults>;

const commonSearch = async (
	endpoint: string,
	query: string,
	page: number
): Promise<SearchResults> => {
	const { data } = await axios.get(
		`/${endpoint}?q=${encodeURIComponent(query)}&page=${page}`
	);

	const $ = cheerio.load(data);

	const words = $('#main-content .row .content')
		.toArray()
		.map((el) => ({
			value: cleanString($(el).find('h2').text()),
			desc: cleanString($(el).find('p').text()),
		}));

	let pages: SearchResults['pages'] = (cleanString(
		$(
			'#main-content > div > div:nth-child(3) > nav > ul > li.disabled > a'
		).text()
	)
		.match(/\d+/g)
		?.map((p) => +p) as SearchResults['pages']) || [1, 1];

	const results: SearchResults = { words, pages };

	return results;
};

export const searchCorpus: SearchFunction = async (query, page?) =>
	commonSearch('s', query, page || 1);

export const searchGeo: SearchFunction = async (query, page?) =>
	commonSearch('geo', query, page || 1);

export const searchAbbreviations: SearchFunction = async (query, page?) =>
	commonSearch('kratenki', query, page || 1);
