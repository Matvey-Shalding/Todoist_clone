export function generateRandomId(): string {
	return String(Math.floor(Math.random() * 10000000) + 1);
}