import { DATES } from '../constants/Date';

export const displayImage = (date: string) => {
	if (date === DATES.NODATE) {
		return '/img/modals/quick_settings/no_term.svg';
	} else if (date === DATES.OUTDATED) {
		return '/img/modals/outdated.svg';
	} else {
		return '/img/modals/credit_card.svg';
	}
};
