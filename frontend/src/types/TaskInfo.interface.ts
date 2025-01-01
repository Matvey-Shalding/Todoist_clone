import { Priority } from './Priority.interface';

export interface TaskInfo {
	label?: string;
	title: string;
	description: string;
	date: string;
	priority: Priority;
	section?: string;
	createdAt: Date;
	time?:string
	[key: string]: any;
}