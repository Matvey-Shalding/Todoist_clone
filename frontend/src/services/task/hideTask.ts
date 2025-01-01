import { Dispatch, SetStateAction } from 'react';
import { Updater } from 'use-immer';
import { GROUPING } from '../../constants/Grouping';
import { TASK } from '../../constants/Task';
import { Grouping } from '../../types/Grouping.type';
import { TasksStructure } from '../../types/TasksStructure.interface';
import { modifyTaskService } from './ModifyTask.service';

export const hideTask = (
	setTasksStructure: Updater<TasksStructure>,
	grouping: Grouping,
	date: string,
	id: string,
	priority: string,
	label: string | undefined,
	section: string | undefined,
	setOnConfirm: Dispatch<SetStateAction<() => void>>,
	setOnReject: Dispatch<SetStateAction<(() => void) | null>>,
	setMessage: Dispatch<SetStateAction<string>>,
	title: string,
	complete?:boolean
) => {
	const setIsVisible = (visible: boolean) => {
		setTasksStructure(prev => {
			switch (grouping) {
				case GROUPING.DATE:
					{
						const index = prev[date].findIndex(t => t.id === id);
						prev[date][index].isVisible = visible;
					}
					break;
				case GROUPING.PRIORITY:
					{
						const index = prev[priority].findIndex(t => t.id === id);
						prev[priority][index].isVisible = visible;
					}
					break;
				case GROUPING.LABEL:
					{
						if (!label) {
							const index = prev[TASK.NOLABEL].findIndex(t => t.id === id);
							prev[TASK.NOLABEL][index].isVisible = visible;
						} else {
							const index = prev[label].findIndex(t => t.id === id);
							prev[label][index].isVisible = visible;
						}
					}
					break;
				case GROUPING.DEFAULT:
					{
						if (!section) {
							const index = prev[TASK.NOSECTION].findIndex(t => t.id === id);
							prev[TASK.NOSECTION][index].isVisible = visible;
						} else {
							const index = prev[section].findIndex(t => t.id === id);
							prev[section][index].isVisible = visible;
						}
					}
					break;
			}
		});
	};
	setIsVisible(true);
	sessionStorage.setItem(id, 'Hidden');
	if (complete) {
		setMessage(`${title} was completed`);
	} else {
		setMessage(`${title} was deleted`);
	}
	setOnConfirm(() => {
		return () => {
			modifyTaskService.deleteTask(setTasksStructure, id);
		};
	});
	setOnReject(() => {
		return () => {
			sessionStorage.setItem(id, '');
			setIsVisible(false);
		};
	});
};
