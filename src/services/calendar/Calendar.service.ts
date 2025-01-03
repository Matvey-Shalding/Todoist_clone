import { Dispatch, SetStateAction } from 'react';
import { DATES } from '../../constants/Date';
import { EXTENDED_TITLE_FORMAT, FORMAT, TITLE_FORMAT } from '../../constants/DateFormat';

class Calendar {
	handleDateChange(
		date: Date | undefined,
		open: boolean,
		setWeekOffset: Dispatch<SetStateAction<number>>
	) {
		const today = new Date();

		if (!open || !date) return;

		// Step 1: Calculate the start of the current week (Monday)
		const dayOfWeek = today.getDay();
		const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If today is Sunday (0), we go back 6 days, else subtract 1
		const startOfWeek = new Date(today);
		startOfWeek.setDate(today.getDate() - daysToMonday);

		// Step 2: Calculate the first Sunday after today (for weekOffset 0 logic)
		const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
		const endOfFirstWeek = new Date(today);
		endOfFirstWeek.setDate(today.getDate() + daysToSunday);

		// Step 3: Calculate the weekOffset
		let weekOffset = 0;

		if (date >= startOfWeek && date <= endOfFirstWeek) {
			// The given date is within the first week (start from today and end on the next Sunday)
			weekOffset = 0;
		} else {
			// For subsequent weeks, find the Monday of the week the given date falls into
			const daysSinceMonday = (date.getTime() - startOfWeek.getTime()) / (1000 * 3600 * 24);
			const mondayOffset = Math.floor(daysSinceMonday / 7); // Round to the nearest previous Monday
			weekOffset = mondayOffset + 1; // Add 1 because the first week is considered `weekOffset 0`
		}

		// Step 4: Update the state with the calculated weekOffset
		setWeekOffset(weekOffset ? weekOffset - 1 : weekOffset);
	}

	calculateSlides(weekOffset: number) {
		const today = new Date();
		const daysOfWeek: string[] = [];

		if (weekOffset === 0) {
			daysOfWeek.push(DATES.OUTDATED, DATES.NODATE);

			// Add today and the rest of the days of the current week, ending on Sunday
			const startOfWeek = new Date(today);

			// Calculate how many days to add to reach the next Sunday
			const dayOfWeek = today.getDay(); // getDay returns 0 for Sunday, 1 for Monday, ..., 6 for Saturday
			const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek; // If today is Sunday (0), it ends today, else calculate the number of days to the next Sunday

			for (let i = 0; i <= daysToSunday; i++) {
				const currentDay = new Date(startOfWeek);
				currentDay.setDate(startOfWeek.getDate() + i);
				daysOfWeek.push(FORMAT.format(currentDay));
			}
		} else {
			const startOfWeek = new Date(today);

			const dayOfWeek = today.getDay();
			const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

			startOfWeek.setDate(today.getDate() - daysToMonday);
			startOfWeek.setDate(startOfWeek.getDate() + weekOffset * 7);

			// Add each day of the week starting from Monday
			for (let i = 0; i < 7; i++) {
				const currentDay = new Date(startOfWeek);
				currentDay.setDate(startOfWeek.getDate() + i);
				daysOfWeek.push(FORMAT.format(currentDay));
			}
		}
		return daysOfWeek;
	}

	handleArrowClick(setWeekOffSet: Dispatch<SetStateAction<number>>, next: boolean) {
		setWeekOffSet(prev => (next ? prev + 1 : prev - 1));
	}

	generateWeekTitle = (weekOffset: number): string => {
		const today = new Date();

		// Calculate the start of the current week (Monday) or the first day of the current week
		const dayOfWeek = today.getDay();
		const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // If today is Sunday (0), go back 6 days; otherwise subtract 1
		const startOfWeek = new Date(today);
		startOfWeek.setDate(today.getDate() - daysToMonday);

		// Adjust for the correct weekOffset
		startOfWeek.setDate(startOfWeek.getDate() + weekOffset * 7);

		// Calculate the end of the week (Sunday)
		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 6);

		// If the week consists of only one day (i.e., today), return "Today"
		if (weekOffset === 0 && startOfWeek.toDateString() === endOfWeek.toDateString()) {
			return DATES.TODAY;
		}

		// Format the start and end of the week as required
		const firstDay = TITLE_FORMAT.format(startOfWeek);
		const lastDay = EXTENDED_TITLE_FORMAT.format(endOfWeek); // Last day with year

		return `${firstDay} - ${lastDay}`;
	};
}

export const calendarService = new Calendar();
