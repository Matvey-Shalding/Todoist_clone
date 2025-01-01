import { useMemo } from 'react';
import { Updater } from 'use-immer';
import { DISPLAYS } from '../../../../../constants/Displays';
import { Display } from '../../../../../types/Display.type';
import { Grouping } from '../../../../../types/Grouping.type';
import { OrderOfSorting } from '../../../../../types/OrderOfSorting.type';
import { Sorting } from '../../../../../types/Sorting.type';
import { TasksStructure } from '../../../../../types/TasksStructure.interface';
import { Board } from '../displays/Board';
import { Calendar } from '../displays/calendar/Calendar';
import { List } from '../displays/List';

export function RenderDisplay({
	tasks,
	display,
	grouping,
	sorting,
	direction,
	sections,
	setSections,
	setTasksStructure,
}: {
	tasks: TasksStructure;
	display: Display;
	grouping: Grouping;
	sorting: Sorting;
	direction: OrderOfSorting;
	sections: string[];
	setSections: Updater<string[]>;
	setTasksStructure: Updater<TasksStructure>;
}) {
	const props = useMemo(() => {
		return {
			sections: sections,
			setSections: setSections,
			direction: direction,
			sorting: sorting,
			tasksStructure: tasks,
			setTasksStructure: setTasksStructure,
			grouping: grouping,
		};
	}, [sections, direction, sorting, tasks, grouping]);
	switch (display) {
		case DISPLAYS.LIST: {
			return <List {...props} />;
		}
		case DISPLAYS.BOARD: {
			return <Board {...props} />;
		}
		case DISPLAYS.CALENDAR: {
			return <Calendar {...props} />;
		}
		default: {
			return <div></div>
			}
	}
}
