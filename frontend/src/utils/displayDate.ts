import { DATES } from '../constants/Date';
import { FORMAT, PRESET_FORMAT } from '../constants/DateFormat';

export const displayDate = (str: string, time?: string, shortFormat?: boolean): string => {
	if (str === DATES.NODATE || str === DATES.OUTDATED) {
		return str;
	}

	const now = new Date();

	const date = new Date(str);

	if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
		if (date.getDate() === now.getDate()) {
			return `${DATES.TODAY} ${time ? ' at ' + time : ''}`;
		} else if (date.getDate() === now.getDate() + 1) {
			return `${DATES.TOMORROW} ${time ? ' at ' + time : ''}`;
		} else {
			return `${shortFormat ? PRESET_FORMAT.format(date) : FORMAT.format(date)} ${
				time ? ' at ' + time : ''
			}`;
		}
	} else {
		return `${shortFormat ? PRESET_FORMAT.format(date) : FORMAT.format(date)} ${
			time ? ' at ' + time : ''
		}`;
	}
};
