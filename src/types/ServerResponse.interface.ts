import { Section } from './Section.interface';
import { Task } from './Task.interface';

export interface ServerResponse {
  tasks: Task[];
  sections:Section[]
} 