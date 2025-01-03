import { Dispatch, SetStateAction } from 'react';
import { DraggableRubric } from 'react-beautiful-dnd';
import { Updater } from 'use-immer';
import { Task } from '../../types/Task.type';
import { TasksStructure } from '../../types/TasksStructure.interface';
import { modifyTaskService } from '../task/ModifyTask.service';
import { MESSAGES } from '../../constants/Messages';

class Section {
	addSection(
		setSections: Updater<Array<string>>,
		section: string,
		setOpen: Dispatch<SetStateAction<boolean>>,
		setTasksStructure: Updater<TasksStructure>
	) {
		setSections(prev => void prev.push(section));
		setOpen(false);
		setTasksStructure(prev => {
			prev[section] = [];
		});
	}

	deleteSection(
		title: string,
		setTasks: Updater<TasksStructure>,
		setSections: Updater<string[]>,
		deleteTasks: boolean | undefined
	) {
		setSections(prev => {
			const index = prev.findIndex(s => s === title);
			prev.splice(index, 1);
		});
		setTasks(prev => {
			for (const [key, value] of Object.entries(prev)) {
				value.forEach((task: Task, index) => {
					if (task.section === title) {
						if (deleteTasks) {
							modifyTaskService.deleteTask(setTasks, task.id);
						} else {
							prev[key][index].section = '';
						}
					}
				});
			}
		});
	}

	getTask(tasksStructure: TasksStructure, rubric: DraggableRubric) {
		for (let index = 0; index < Object.values(tasksStructure).length; index++) {
			const tasks = Object.values(tasksStructure)[index];
			for (let j = 0; j < tasks.length; j++) {
				const task = tasks[j];
				if (task.id === rubric.draggableId) {
					return task;
				}
			}
		}
	}

	changeTitle(
		setMessage: Dispatch<SetStateAction<string>>,
		setOnConfirm: (value: React.SetStateAction<() => void>) => void,
		setOnReject: (value: React.SetStateAction<(() => void) | null>) => void,
		setSections: Updater<string[]>,
		title: string,
		setTasksStructure: Updater<TasksStructure>,
		inputTitle: React.MutableRefObject<HTMLInputElement | null>,
		setIsEdit: Dispatch<SetStateAction<boolean>>
	) {
		setMessage(MESSAGES.CHANGE_TITLE);
		setOnConfirm(() => {
			return () => {};
		});
		setOnReject(() => {
			return () => {
				setSections(prev => {
					const index = prev.findIndex(s => s === newTitle);
					if (index !== -1) {
						prev[index] = title;
					}
				});
				setTasksStructure(prev => {
					for (const [key, tasks] of Object.entries(prev)) {
						tasks.forEach((task, index) => {
							if (task.section === newTitle) {
								prev[key][index].section = title;
							}
						});
					}
				});
			};
		});
		const newTitle = inputTitle.current?.value;
		if (!newTitle) return;
		setSections(prev => {
			const index = prev.findIndex(s => s === title);
			if (index !== -1) {
				prev[index] = newTitle;
			}
		});
		setTasksStructure(prev => {
			for (const [key, tasks] of Object.entries(prev)) {
				tasks.forEach((task, index) => {
					if (task.section === title) {
						prev[key][index].section = newTitle;
					}
				});
			}
		});
		if (inputTitle.current) {
			inputTitle.current.value = '';
		}
		setIsEdit(false);
	}
}

export const sectionService = new Section();
