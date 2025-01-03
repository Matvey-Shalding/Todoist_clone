import { useEffect, useRef } from 'react';
import { Updater } from 'use-immer';
import { v4 } from 'uuid';
import { GROUPING } from '../../../../../constants/Grouping';
import { SECTION } from '../../../../../constants/Section';
import { TASK } from '../../../../../constants/Task';
import { Grouping } from '../../../../../types/Grouping.type';
import { TasksStructure } from '../../../../../types/TasksStructure.interface';
import styles from '../../../../../styles/assets/scrollbar.module.scss'
import { Section } from '../section/Section';
export function List({
	setSections,
	tasksStructure,
	setTasksStructure,
	grouping,
}: {
	setSections: Updater<string[]>;
	tasksStructure: TasksStructure;
	setTasksStructure: Updater<TasksStructure>;
	grouping: Grouping;
	}) {
	//State

	const containerWidth = useRef<HTMLDivElement | null>(null);

	//UseEffects

	useEffect(() => {
		if (containerWidth.current) {
			containerWidth.current.style.height =
				document.documentElement.clientHeight -
				containerWidth.current.getBoundingClientRect().top +
				'px';
		}
	});
	return (
		<div
			style={{ overflowX: 'hidden', overflowY: 'scroll' }}
			ref={containerWidth}
			className={styles.element}
		>
			<div className='flex min-h-full flex-nowrap flex-col gap-y-9 pl-6 pr-6'>
				{Object.keys(tasksStructure).map(key => {
					return (
						<Section
							tasksStructure={tasksStructure}
							setTasksStructure={setTasksStructure}
							editable={grouping === GROUPING.DEFAULT && key !== TASK.NOSECTION}
							setSections={setSections}
							type={SECTION.LARGE}
							key={v4()}
							title={key}
							tasks={tasksStructure[key]}
						/>
					);
				})}
			</div>
		</div>
	);
}
