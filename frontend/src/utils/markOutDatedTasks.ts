import { DATES } from '../constants/Date';
import { Task } from '../types/Task.type';

export const markOutdatedDates = (tasks: Task[]): Task[] => {
	return tasks.map(task => {
		let isOutdated = false;

		if (typeof task.date === 'string' && isNaN(Date.parse(task.date))) {
			// If the date is plain text, return it as is
			return { ...task };
		}

		// Parse the date property
		const date = new Date(task.date);
		console.log(task.date,task.time)

		// If a valid time is provided, use it. Otherwise, default to 23:59:59
		if (task.time && /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(task.time)) {
			const [hours, minutes] = task.time.split(':').map(Number);
			date.setHours(hours, minutes, 0, 0);
		} else {
			date.setHours(23, 59, 59, 999);
		}

		// Check if the date and time are in the past
		isOutdated = date.getTime() < Date.now();

		// If outdated, modify the taskect accordingly
		if (isOutdated) {
			return { ...task, date: DATES.OUTDATED, time: undefined };
		}

		// If not outdated, return the taskect as is
		return task;
	});
};
