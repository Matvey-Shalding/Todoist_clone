const now: Date = new Date();

export interface FormattedDate {
	time?: string;
	date: string;
	month: string;
	year: string;
}

export const initialTime: FormattedDate = {
	date: String(now.getDate()),
	month: String(now.getMonth()),
	year: String(now.getFullYear()),
};
