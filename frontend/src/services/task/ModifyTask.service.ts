import { Dispatch, SetStateAction } from 'react';
import { Updater } from 'use-immer';
import { TaskInfo } from '../../types/TaskInfo.interface';
import { TasksStructure } from '../../types/TasksStructure.interface';
import { getTasks } from '../../utils/getTasks';

class ModifyTask {
	handleInputChange(
		event: React.ChangeEvent<HTMLInputElement>,
		isTitle: boolean,
		setError: Dispatch<SetStateAction<string>>,
		tasksStructure: TasksStructure,
		setTask: Updater<TaskInfo>,
		setDisabled?: Dispatch<SetStateAction<boolean>>,
		ref?: React.MutableRefObject<HTMLInputElement | null>,
		id?: string
	) {
		if (setDisabled && ref) {
			if (event.target.value.length > 0) {
				if (ref.current) {
					if (ref.current.value.length === 0) {
						setDisabled(true);
					} else {
						setDisabled(false);
					}
				}
			} else {
				setDisabled(true);
			}
		}
		if (isTitle) {
			setTask(prev => {
				prev.title = event.target.value;
			});
		} else {
			setTask(prev => {
				prev.description = event.target.value;
			});
		}
		const title = event.target.value;
		if (isTitle) {
			const tasks = getTasks(tasksStructure);
			for (const task of tasks) {
				if (task.title === title) {
					if (!id || (id && task.id !== id)) {
						setError('This title`s already been used');
						break;
					}
				}
			}
		}
	}

	deleteTask(setTasks: Updater<TasksStructure>, id: string): void {
		setTasks(prev => {
			Object.entries(prev).map(([title, tasks], index) => {
				const current = tasks.findIndex(task => task.id === id);
				if (current >= 0) {
					prev[title].splice(current, 1);
				}
			});
		});
	}
}

export const modifyTaskService = new ModifyTask();
