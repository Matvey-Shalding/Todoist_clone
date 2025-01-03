import { Dispatch, SetStateAction } from 'react';
import { DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { Updater } from 'use-immer';
import { Grouping } from '../../types/Grouping.type';
import { Menu } from '../../types/Menu.type';
import { Priority } from '../../types/Priority.interface';
import { TaskInfo } from '../../types/TaskInfo.interface';
import { TasksStructure } from '../../types/TasksStructure.interface';
import { hideTask } from './hideTask';
import { saveEditedTask } from './saveEditedTask';

class Task {
	animate(
		style: DraggingStyle | NotDraggingStyle | undefined,
		snapshot: DraggableStateSnapshot
	) {
		if (!snapshot.isDropAnimating) return style;
		return {
			...style,
			transitionDuration: `0.001s`,
		};
	}

	displayLabel(label: string) {
		return '@ ' + label.trim();
	}

	hide(
		setTasksStructure: Updater<TasksStructure>,
		grouping: Grouping,
		date: string,
		id: string,
		priority: Priority,
		label: string | undefined,
		section: string | undefined,
		setOnConfirm: Dispatch<SetStateAction<() => void>>,
		setOnReject: Dispatch<SetStateAction<(() => void) | null>>,
		setMessage: Dispatch<SetStateAction<string>>,
		title: string,
		complete?: boolean
	) {
		hideTask(
			setTasksStructure,
			grouping,
			date,
			id,
			priority,
			label,
			section,
			setOnConfirm,
			setOnReject,
			setMessage,
			title,
			complete
		);
	}

	resetEditedTask(
		titleInput: React.MutableRefObject<HTMLInputElement | null>,
		descriptionInput: React.MutableRefObject<HTMLInputElement | null>,
		setMenu: Dispatch<SetStateAction<Menu | undefined>>,
		setTaskInfo: Updater<TaskInfo>,
		defaultTaskInfo: TaskInfo
	) {
		if (titleInput.current) {
			titleInput.current.value = '';
		}
		if (descriptionInput.current) {
			descriptionInput.current.value = '';
		}
		setMenu(undefined);
		setTaskInfo(defaultTaskInfo);
	}

	saveTask(
		setMessage: Dispatch<SetStateAction<string>>,
		taskInfo: TaskInfo,
		setOnConfirm: Dispatch<SetStateAction<() => void>>,
		setOnReject: Dispatch<SetStateAction<(() => void) | null>>,
		setTasksStructure: Updater<TasksStructure>,
		id: string,
		setEdit: Dispatch<SetStateAction<boolean>>,
		setUpdate: Dispatch<SetStateAction<string>>,
		titleInput: React.MutableRefObject<HTMLInputElement | null>,
		descriptionInput: React.MutableRefObject<HTMLInputElement | null>,
		setMenu: Dispatch<SetStateAction<Menu | undefined>>,
		setTaskInfo: Updater<TaskInfo>,
		defaultTaskInfo: TaskInfo
	) {
		this.resetEditedTask(titleInput, descriptionInput, setMenu, setTaskInfo, defaultTaskInfo);
		saveEditedTask(
			setMessage,
			taskInfo,
			setOnConfirm,
			setOnReject,
			setTasksStructure,
			id,
			setEdit,
			setUpdate,
			defaultTaskInfo
		);
	}
}

export const taskService = new Task();
