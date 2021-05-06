import axios from 'axios';
import cheerio from 'cheerio';
import { cleanString } from '../utils';

axios.defaults.baseURL = 'https://makedonski.gov.mk';

export type SearchResults = { value: string; desc: string }[];

const commonSearch = async (
	endpoint: string,
	query: string
): Promise<SearchResults> => {
	const { data } = await axios.get(
		`/${endpoint}?q=${encodeURIComponent(query)}`
	);

	const $ = cheerio.load(data);

	const results = $('#main-content .row .content')
		.toArray()
		.map((el) => ({
			value: cleanString($(el).find('h2').text()),
			desc: cleanString($(el).find('p').text()),
		}));

	return results;
};

export const searchCorpus = async (query: string): Promise<SearchResults> =>
	commonSearch('s', query);

export const searchGeo = async (query: string): Promise<SearchResults> =>
	commonSearch('geo', query);

export const searchAbbreviations = async (
	query: string
): Promise<SearchResults> => commonSearch('kratenki', query);
