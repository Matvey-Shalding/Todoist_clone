import { Task } from '../types/Task.type';
import { TasksStructure } from '../types/TasksStructure.interface';

export const getTasks = (tasksStructure: TasksStructure): Task[] => {
	return Object.values(tasksStructure).reduce((acc, tasks) => {
		tasks.forEach(task => void acc.push(task));

		return acc;
	}, []);
};
