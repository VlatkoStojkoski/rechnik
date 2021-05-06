export const cleanString = (str: string) =>
	str.trim().replace(/\n/g, ' ').replace(/ +/g, ' ');
