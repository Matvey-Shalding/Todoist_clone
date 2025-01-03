import { Updater } from 'use-immer';
import { DATES } from '../../constants/Date';
import { ORDEROFSORTING } from '../../constants/OrderOfSorting';
import { PRIORITIES } from '../../constants/Priority';
import { SORTING } from '../../constants/Sorting';
import { OrderOfSorting } from '../../types/OrderOfSorting.type';
import { Sorting } from '../../types/Sorting.type';
import { Task } from '../../types/Task.type';
import { TasksStructure } from '../../types/TasksStructure.interface';
import { compileStringToDate } from '../../utils/compileStringToDate';

const PRIORITYINDEXES = {
	[PRIORITIES.HIGH]: 3,
	[PRIORITIES.MEDIUM]: 2,
	[PRIORITIES.LIGHT]: 1,
	[PRIORITIES.DEFAULT]: 0,
};

export const sortTaskStructure = (
	setTasksStructure: Updater<TasksStructure>,
	sorting: Sorting,
	order: OrderOfSorting
) => {
	if (sorting === SORTING.DEFAULT || sorting === SORTING.NO) return;
	setTasksStructure(tasksStructure => {
		switch (sorting) {
			case SORTING.DATEADDED:
				Object.keys(tasksStructure).forEach(key => {
					tasksStructure[key].sort((a, b) => {
						if (order === ORDEROFSORTING.ASCENDING) {
							if (a.createdAt > b.createdAt) return 1;
							if (a.createdAt === b.createdAt) return 0;
							if (a.createdAt < b.createdAt) return -1;
						} else {
							if (a.createdAt > b.createdAt) return -1;
							if (a.createdAt === b.createdAt) return 0;
							if (a.createdAt < b.createdAt) return 1;
						}
						return 0;
					});
				});
				break;

			case SORTING.TITLE:
				Object.keys(tasksStructure).forEach(key => {
					tasksStructure[key].sort((a, b) => {
						if (order === ORDEROFSORTING.ASCENDING) {
							if (a.title > b.title) return 1;
							if (a.title === b.title) return 0;
							if (a.title < b.title) return -1;
						} else {
							if (a.title > b.title) return -1;
							if (a.title === b.title) return 0;
							if (a.title < b.title) return 1;
						}
						return 0;
					});
				});
				break;
			case SORTING.TARGETDATE:
				Object.keys(tasksStructure).forEach(key => {
					const outdatedTasks: Task[] = [];
					const noDateTasks: Task[] = [];
					const tasks: Task[] = []
					tasksStructure[key].forEach(task => {
						if (task.date === DATES.NODATE) {
							noDateTasks.push(task)
						} else if (task.date === DATES.OUTDATED) {
							outdatedTasks.push(task )
						} else {
							tasks.push(task)
						}
					})
					tasks.sort((a, b) => {
						let dateA = compileStringToDate(a.date, a.time);
						let dateB = compileStringToDate(b.date, b.time);
						if (order === ORDEROFSORTING.ASCENDING) {
							if (dateA > dateB) return 1;
							if (dateA === dateB) return 0;
							if (dateA < dateB) return -1;
						} else {
							if (dateA > dateB) return -1;
							if (dateA === dateB) return 0;
							if (dateA < dateB) return 1;
						}
						return 0;
					});
					delete tasksStructure[key];
					tasksStructure[key] = [];
					tasksStructure[key].push(...outdatedTasks)
					tasksStructure[key].push(...tasks)
					tasksStructure[key].push(...noDateTasks)
				});
				break;
			case SORTING.PRIORITY:
				Object.keys(tasksStructure).forEach(key => {
					tasksStructure[key].sort((a, b) => {
						if (order === ORDEROFSORTING.ASCENDING) {
							if (PRIORITYINDEXES[a.priority] > PRIORITYINDEXES[b.priority]) return 1;
							if (PRIORITYINDEXES[a.priority] === PRIORITYINDEXES[b.priority]) return 0;
							if (PRIORITYINDEXES[a.priority] < PRIORITYINDEXES[b.priority]) return -1;
						} else {
							if (PRIORITYINDEXES[a.priority] > PRIORITYINDEXES[b.priority]) return -1;
							if (PRIORITYINDEXES[a.priority] === PRIORITYINDEXES[b.priority]) return 0;
							if (PRIORITYINDEXES[a.priority] < PRIORITYINDEXES[b.priority]) return 1;
						}
						return 0;
					});
				});
				break;
			default:
				break;
		}
	});
};
