export function unCapitalizeFirstLetter(str: string): string {
	return str.length > 0 ? str[0].toLowerCase() + str.slice(1) : str;
}
