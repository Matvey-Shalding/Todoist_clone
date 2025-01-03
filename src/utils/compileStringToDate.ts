import { DATES } from '../constants/Date';

export const compileStringToDate = (date: string, time?: string): Date | string => {
	if (date === DATES.NODATE || date === DATES.OUTDATED) return date;

	if (time) {
		if (date === DATES.TODAY) {
			return new Date(`${new Date()} ${time}`);
		} else if (date === DATES.TOMORROW) {
			return new Date(`${new Date(new Date().setDate(new Date().getDate() + 1))} ${time}`);
		} else return new Date(`${date} ${time}`);
	} else {
		if (date === DATES.TODAY) {
			const today = new Date();
			today.setHours(23, 59, 0, 0);
			return today;
		} else if (date === DATES.TOMORROW) {
			const tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			tomorrow.setHours(23, 59, 0, 0);
			return tomorrow;
    } else {
      return new Date(date)
    }
	}
};
