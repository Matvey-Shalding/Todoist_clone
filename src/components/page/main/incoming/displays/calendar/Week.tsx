import { useEffect, useMemo, useRef, useState } from 'react';
import { Updater } from 'use-immer';
import { v4 } from 'uuid';
import { SECTION } from '../../../../../../constants/Section';
import { calendarService } from '../../../../../../services/calendar/Calendar.service';
import styles from '../../../../../../styles/assets/scrollbar.module.scss';
import '../../../../../../styles/lib/scrollbar.scss';
import { OrderOfSorting } from '../../../../../../types/OrderOfSorting.type';
import { Sorting } from '../../../../../../types/Sorting.type';
import { TasksStructure } from '../../../../../../types/TasksStructure.interface';
import { getTasks } from '../../../../../../utils/getTasks';
import { Section } from '../../section/Section';
export function Week({
	weekOffSet,
	setTasksStructure,
	setSections,
	tasksStructure,
	order,
	sorting,
}: {
	weekOffSet: number;
	setSections: Updater<string[]>;
	tasksStructure: TasksStructure;
	setTasksStructure: Updater<TasksStructure>;
	order: OrderOfSorting;
	sorting: Sorting;
}) {
	//UseMemo

	const tasks = useMemo(() => {
		return getTasks(tasksStructure);
	}, [tasksStructure]);

	//State

	const [, setUpdate] = useState('');
	const el = useRef<null | HTMLDivElement>(null);

	const scrollElement = useRef<null | HTMLDivElement>(null);

	//UseEffects

	useEffect(() => {
		if (scrollElement.current) {
			scrollElement.current.style.width =
				document.documentElement.clientWidth -
				scrollElement.current.getBoundingClientRect().left +
				'px';
			scrollElement.current.style.height =
				document.documentElement.clientHeight -
				scrollElement.current.getBoundingClientRect().top +
				'px';
		}
	}, []);
	useEffect(() => {
		if (el.current) {
			el.current.style.height =
				window.screen.height - 120 - el.current.getBoundingClientRect().top + 'px';
		}
	}, []);
	useEffect(() => {
		setUpdate(v4());
	}, [tasksStructure]);

	return (
		<div
			ref={scrollElement}
			className={`overflow-y-hidden  pl-5 pr-5 flex gap-x-5 overflow-x-scroll ${styles.element}`}
		>
			{calendarService.calculateSlides(weekOffSet).map(date => {
				const properTasks = tasks.filter(task => {
					return task.date === date && !task.isVisible;
				});
				return (
					<Section
						realTitle={date}
						isCalendar
						sorting={sorting}
						order={order}
						editable={false}
						tasksStructure={tasksStructure}
						setSections={setSections}
						setTasksStructure={setTasksStructure}
						title={date}
						tasks={properTasks}
						type={SECTION.SMALL}
					/>
				);
			})}
		</div>
	);
}
