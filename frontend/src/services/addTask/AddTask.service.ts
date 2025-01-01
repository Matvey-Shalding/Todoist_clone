import { Dispatch, SetStateAction } from 'react';
import { Height } from 'react-animate-height';
import { Updater } from 'use-immer';
import { FORMAT } from '../../constants/DateFormat';
import { GROUPING } from '../../constants/Grouping';
import { PARAMETERS } from '../../constants/Parameters';
import { PRIORITIES } from '../../constants/Priority';
import { TASK } from '../../constants/Task';
import { Grouping } from '../../types/Grouping.type';
import { Menu } from '../../types/Menu.type';
import { Task } from '../../types/Task.type';
import { TaskInfo } from '../../types/TaskInfo.interface';
import { TasksStructure } from '../../types/TasksStructure.interface';
import { generateRandomId } from '../../utils/generateRandomID';
import { modifyTaskService } from '../task/ModifyTask.service';

class AddTask {
	defaultTaskInfo: TaskInfo = {
		title: '',
		description: '',
		date: FORMAT.format(new Date()),
		label: '',
		createdAt: new Date(),
		priority: PRIORITIES.DEFAULT,
	};

	reset(
		setMenu: (value: SetStateAction<Menu | undefined>) => void,
		setHeight: (value: SetStateAction<Height>) => void,
		setTaskInfo: Updater<TaskInfo>
	) {
		setMenu(undefined);
		setHeight(0);
		setTaskInfo(this.defaultTaskInfo);
	}

	add(
		taskInfo: TaskInfo,
		setTasksStructure: Updater<TasksStructure>,
		grouping: Grouping,
		setOpen: Dispatch<SetStateAction<boolean>>,
		setOnReject: (value: SetStateAction<(() => void) | null>) => void,
		setOnConfirm: (value: SetStateAction<() => void>) => void,
		setMessage: Dispatch<SetStateAction<string>>,
		setMenu: (value: SetStateAction<Menu | undefined>) => void,
		setHeight: (value: SetStateAction<Height>) => void,
		setTaskInfo: Updater<TaskInfo>
	) {
		const id = generateRandomId();
		const task: Task = { ...taskInfo, id };
		setTasksStructure(prev => {
			const parameter = PARAMETERS[grouping];
			let value = task[parameter];
			if ((grouping === GROUPING.DEFAULT || grouping === GROUPING.SECTION) && !value) {
				value = TASK.NOSECTION;
			} else if (grouping === GROUPING.LABEL && !value) {
				value = TASK.NOLABEL;
			}
			if (Array.isArray(prev[value])) {
				prev[value].push(task);
			} else {
				prev[value] = [task];
			}
		});
		setOpen(false);
		this.reset(setMenu, setHeight, setTaskInfo);
		setMessage(`${task.title} was created`);
		setOnReject(() => {
			return () => modifyTaskService.deleteTask(setTasksStructure, id);
		});
		setOnConfirm(() => {
			return () => undefined;
		});
	}
}

export const addTaskService = new AddTask();
