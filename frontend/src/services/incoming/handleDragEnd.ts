import { arrayMoveMutable } from 'array-move';
import { Dispatch, SetStateAction } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { Updater } from 'use-immer';
import { Grouping } from '../../types/Grouping.type';
import { TasksStructure } from '../../types/TasksStructure.interface';

import { v4 } from 'uuid';
import { DATES } from '../../constants/Date';
import { DISPLAYS } from '../../constants/Displays';
import { GROUPING } from '../../constants/Grouping';
import { MESSAGES } from '../../constants/Messages';
import { PARAMETERS } from '../../constants/Parameters';
import { Display } from '../../types/Display.type';

export const handleDragEnd = (
	triggerRerender: React.Dispatch<React.SetStateAction<string>>,
	e: DropResult,
	setTasksStructure: Updater<TasksStructure>,
	grouping: Grouping,
	setMessage: Dispatch<SetStateAction<string>>,
	setOnConfirm: React.Dispatch<React.SetStateAction<() => void>>,
	setOnReject: React.Dispatch<React.SetStateAction<(() => void) | null>>,
	display: Display
) => {
	const { destination, source, draggableId } = e;
	console.log(destination?.droppableId, source.droppableId);
	if (!destination) return;
	if (destination.droppableId === source.droppableId) {
		setTasksStructure(prev => {
			const activeIndex = source.index;
			const overIndex = destination.index;
			if (activeIndex !== overIndex) {
				arrayMoveMutable(prev[destination.droppableId], activeIndex, overIndex);
				setMessage(MESSAGES.CHANGE_TASKS_ORDER);
				setOnConfirm(() => () => {});
				setOnReject(null);
			}
		});
	} else {
		setTasksStructure(prev => {
			if (display === DISPLAYS.CALENDAR) {
				if (destination.droppableId === DATES.OUTDATED) {
					return;
				} else {
					const target: { [key: string]: number } = {};
					loop: for (const key of Object.keys(prev)) {
						for (let i = 0; i < prev[key].length; i++) {
							if (prev[key][i].id === draggableId) {
								target[key] = i;
								break loop;
							}
						}
					}
					const task = prev[Object.keys(target)[0]][Object.values(target)[0]];
					task.date = destination.droppableId;
					setMessage(`${task.title} was changed`);
					setOnConfirm(() => () => {});
					setOnReject(null);
				}
			} else {
				const parameter: any = PARAMETERS[grouping];
				const index = prev[source.droppableId].findIndex(t => t.id === draggableId);
				let title = destination.droppableId;
				if (grouping === GROUPING.DATE) {
					if (destination.droppableId === DATES.TODAY) {
						const date = new Date();
						date.setHours(23, 59, 59, 59);
						return new Date().toString();
					} else {
						const date = new Date();
						date.setHours(23, 59, 59, 59);
						date.setDate(date.getDate() + 1);
						return new Date().toString();
					}
				}
				prev[source.droppableId][index][parameter] = title;
			}
		});
		triggerRerender(v4());
	}
};
