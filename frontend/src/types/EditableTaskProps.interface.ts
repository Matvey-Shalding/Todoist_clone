import { Updater } from 'use-immer';
import { Task } from './Task.type';
import { TasksStructure } from './TasksStructure.interface';
import { TaskInfo } from './TaskInfo.interface';

export interface EditableTaskProps extends Task {
	tasksStructure: TasksStructure;
	setTasksStructure: Updater<TasksStructure>;
}
