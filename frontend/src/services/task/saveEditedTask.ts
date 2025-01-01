import { Dispatch, SetStateAction } from 'react';
import { Updater } from 'use-immer';
import { v4 } from 'uuid';
import { TasksStructure } from '../../types/TasksStructure.interface';
import { TaskInfo } from '../../types/TaskInfo.interface';

export const saveEditedTask = (
	setMessage: Dispatch<SetStateAction<string>>,
	taskInfo: TaskInfo,
	setOnConfirm: Dispatch<SetStateAction<() => void>>,
	setOnReject: Dispatch<SetStateAction<(() => void) | null>>,
	setTasksStructure: Updater<TasksStructure>,
	id: string,
	setEdit: Dispatch<SetStateAction<boolean>>,
	setUpdate: Dispatch<SetStateAction<string>>,
	defaultTaskInfo: TaskInfo
) => {
	setMessage(`${taskInfo.title} was changed`);
	setOnConfirm(() => {
		return () => {};
	});
	setOnReject(() => {
		return () => {
			setTasksStructure(prev => {
				const TaskMap: { [key: string]: number } = {};
				Object.entries(prev).forEach(([key, tasks]) => {
					const index = tasks.findIndex(task => task.id === id);
					if (index !== -1) {
						TaskMap[key] = index;
					}
				});
				prev[Object.keys(TaskMap)[0]][Object.values(TaskMap)[0]] = {
					...defaultTaskInfo,
					id: id,
				};
			});
		};
	});
	setTasksStructure(prev => {
		const TaskMap: { [key: string]: number } = {};
		Object.entries(prev).forEach(([key, tasks]) => {
			const index = tasks.findIndex(task => task.id === id);
			if (index !== -1) {
				TaskMap[key] = index;
			}
		});
		prev[Object.keys(TaskMap)[0]][Object.values(TaskMap)[0]] = {
			...taskInfo,
			id: id,
		};
	});
	setEdit(false);
	setUpdate(() => v4());
};
