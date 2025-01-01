import { useEffect, useRef } from 'react';
import { Updater } from 'use-immer';
import { v4 } from 'uuid';
import { GROUPING } from '../../../../../constants/Grouping';
import { SECTION } from '../../../../../constants/Section';
import { TASK } from '../../../../../constants/Task';
import styles from '../../../../../styles/assets/scrollbar.module.scss';
import { Grouping } from '../../../../../types/Grouping.type';
import { TasksStructure } from '../../../../../types/TasksStructure.interface';
import AddSection from '../section/AddSectionMenu';
import { Section } from '../section/Section';
export function Board({
	setSections,
	tasksStructure,
	grouping,
	setTasksStructure,
}: {
	setSections: Updater<string[]>;
	tasksStructure: TasksStructure;
	setTasksStructure: Updater<TasksStructure>;
	grouping: Grouping;
}) {
	//State

	const element = useRef<null | HTMLDivElement>(null);

	//UseEffects

	useEffect(() => {
		if (element.current) {
			element.current.style.height =
				document.documentElement.clientHeight -
				element.current.getBoundingClientRect().top +
				'px';
		}
	});

	return (
		<div ref={element} className={`${styles.element} overflow-y-hidden`}>
			<div className='gap-x-5 items-center gap-y-4 pl-6 min-h-full flex flex-nowrap'>
				{Object.keys(tasksStructure).map(key => {
					const title = key === '' ? TASK.NOLABEL : key;
					const editable = grouping === GROUPING.DEFAULT && key !== TASK.NOSECTION;
					return (
						<Section
							tasksStructure={tasksStructure}
							setSections={setSections}
							setTasksStructure={setTasksStructure}
							editable={editable}
							type={SECTION.SMALL}
							key={v4()}
							title={title}
							tasks={tasksStructure[key]}
						/>
					);
				})}
				{grouping === GROUPING.DEFAULT && (
					<AddSection setTasksStructure={setTasksStructure} setSections={setSections} />
				)}
			</div>
		</div>
	);
}
