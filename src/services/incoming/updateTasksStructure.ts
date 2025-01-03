import { Updater } from 'use-immer';
import { GROUPING } from '../../constants/Grouping';
import { PARAMETERS } from '../../constants/Parameters';
import { TASK } from '../../constants/Task';
import { Grouping } from '../../types/Grouping.type';
import { OrderOfSorting } from '../../types/OrderOfSorting.type';
import { Sorting } from '../../types/Sorting.type';
import { TasksStructure } from '../../types/TasksStructure.interface';
import { getTasks } from '../../utils/getTasks';
import { sortTaskStructure } from './sortTasksStructure';

export function updateTasksStructure(
	grouping: Grouping,
	setTasksStructure: Updater<TasksStructure>,
	sections: string[],
	sorting: Sorting,
	orderOfSorting: OrderOfSorting
) {
	setTasksStructure(prev => {
		const updatedTasksStructure: TasksStructure = {};
		const tasks = getTasks(prev);

		tasks.forEach(task => {
			const parameter = PARAMETERS[grouping];
			let value = task[parameter];
			if ((grouping === GROUPING.DEFAULT || grouping === GROUPING.SECTION) && !value) {
				value = TASK.NOSECTION;
			} else if (grouping === GROUPING.LABEL && !value) {
				value = TASK.NOLABEL;
			}
			if (Array.isArray(updatedTasksStructure[value])) {
				updatedTasksStructure[value].push(task);
			} else {
				updatedTasksStructure[value] = [task];
			}
		});

		if (grouping === GROUPING.DEFAULT || grouping === GROUPING.SECTION) {
			sections.forEach(section => {
				if (!Array.isArray(updatedTasksStructure[section])) {
					updatedTasksStructure[section] = [];
				}
			});
		}
		Object.keys(prev).forEach(key => {
			delete prev[key];
		});
		Object.keys(updatedTasksStructure).forEach(key => {
			prev[key] = updatedTasksStructure[key];
		});
	});

	sortTaskStructure(setTasksStructure, sorting, orderOfSorting);
}
