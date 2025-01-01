import { Task } from './Task.interface';

export interface ServerData {
  tasks: Task[]
  sections: string[]
  username:string
}