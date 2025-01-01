import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Updater } from 'use-immer';
import { pageConfig } from '../../config/pages.config';
import { LOCAL_STORAGE } from '../../constants/LocalStorage';
import { REQUEST_PURPOSES } from '../../constants/RequestPurposes';
import { Display } from '../../types/Display.type';
import { Grouping } from '../../types/Grouping.type';
import { OrderOfSorting } from '../../types/OrderOfSorting.type';
import { Sorting } from '../../types/Sorting.type';
import { Task } from '../../types/Task.type';
import { TasksStructure } from '../../types/TasksStructure.interface';
import { getTasks } from '../../utils/getTasks';
import { handleDragEnd } from './handleDragEnd';
import { updateTasksStructure } from './updateTasksStructure';

class Incoming {
	saveToLocalStorage(tasksStructure: TasksStructure, sections: string[]): void {
		const tasks = getTasks(tasksStructure);
		const stringifiedTasks = tasks.map(t => JSON.stringify(t));
		localStorage[LOCAL_STORAGE.TASKS] = JSON.stringify(stringifiedTasks);
		localStorage[LOCAL_STORAGE.SECTIONS] = JSON.stringify(sections);
	}

	isEmpty(tasksStructure: TasksStructure): boolean {
		return !Object.values(tasksStructure).some((tasks: any) => {
			return tasks.length > 0 && tasks.some((task: Task) => !task.isVisible);
		});
	}

	updateTasksStructure(
		grouping: Grouping,
		setTasksStructure: Updater<TasksStructure>,
		sections: string[],
		sorting: Sorting,
		orderOfSorting: OrderOfSorting
	) {
		updateTasksStructure(grouping, setTasksStructure, sections, sorting, orderOfSorting);
	}

	async sendToServer(tasksStructure: TasksStructure, sections: string[]) {
		const tasks: Task[] = getTasks(tasksStructure);
		try {
			const data = {
				username: localStorage[LOCAL_STORAGE.USERNAME],
				purpose: REQUEST_PURPOSES.SEND_TO_SERVER,
				tasks: tasks,
				sections: sections,
			};
			axios.post(pageConfig.storage, data);
		} catch (error) {
			console.error('Error sending state:', error);
		}
	}

	handleDragEnd(
		triggerRerender: React.Dispatch<React.SetStateAction<string>>,
		e: DropResult,
		setTasksStructure: Updater<TasksStructure>,
		grouping: Grouping,
		setMessage: Dispatch<SetStateAction<string>>,
		setOnConfirm: React.Dispatch<React.SetStateAction<() => void>>,
		setOnReject: React.Dispatch<React.SetStateAction<(() => void) | null>>,
		display: Display
	) {
		handleDragEnd(
			triggerRerender,
			e,
			setTasksStructure,
			grouping,
			setMessage,
			setOnConfirm,
			setOnReject,
			display
		);
	}
}

export const incomingService = new Incoming();
