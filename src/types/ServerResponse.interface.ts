import { Task } from './Task.type';

export interface ServerResponse {
	tasks: Task[];
	sections: string[];
}
