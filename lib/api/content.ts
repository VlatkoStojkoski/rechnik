import axios from 'axios';
import cheerio from 'cheerio';
import { cleanString } from '../utils';

axios.defaults.baseURL = 'https://makedonski.gov.mk';

export interface DefinitionPage {
	word: string;
	type: string;
	example: string;
	content: string;
	original: string;
}

export const getPage = async (word: string): Promise<DefinitionPage> => {
	const { data } = await axios.get(`/corpus/${encodeURIComponent(word)}`);

	const $ = cheerio.load(data);

	const result = {
		word,
		type: cleanString($($('#main-content .content p')[0]).text()),
		example: cleanString($($('#main-content .content p')[1]).text()),
		content: $('#main-content .content .content ')
			.text()
			.replace(/ +/g, ' ')
			.replace(/(( +)?\n( +)?)+/g, '\n')
			.trim(),
		original: cleanString(
			$('#main-content .content div.col-12.col-md-4 > div > p').text()
		),
	};

	return result;
};
