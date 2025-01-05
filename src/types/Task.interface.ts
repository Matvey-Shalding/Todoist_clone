import { Priority } from './Priority.interface';

export interface Task {
	id: string;
	task_id: number;
	user_id: number;
	label?: string;
	title: string;
	description: string;
	date: string;
	priority: Priority;
	section?: string;
	createdAt: Date;
	time?: string;
	[key: string]: any;
}
