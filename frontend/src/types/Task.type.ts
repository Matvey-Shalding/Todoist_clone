import { Updater } from 'use-immer';
import { TasksStructure } from './TasksStructure.interface';
import { Section } from './Section.type';
import { TaskInfo } from './TaskInfo.interface';

export interface Task extends TaskInfo {
  id: string;
  isVisible?: boolean;
  [key:string]:any
}

export interface TaskProps extends Task {
	tasksStructure: TasksStructure;
	setTasksStructure: Updater<TasksStructure>;
	index: number;
  isClone?: boolean;
  type:Section
}