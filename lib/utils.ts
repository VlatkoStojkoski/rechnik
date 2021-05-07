export const cleanString = (str: string) =>
	str.trim().replace(/\n/g, ' ').replace(/ +/g, ' ');

export const cammilify = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1);
