import { Fragment, useEffect, useRef, useState } from 'react';
import AnimateHeight, { Height } from 'react-animate-height';
import { Droppable } from 'react-beautiful-dnd';
import { Updater } from 'use-immer';
import { v4 } from 'uuid';
import { SECTION } from '../../../../../constants/Section';
import { sectionService } from '../../../../../services/section/Section.service';
import styles from '../../../../../styles/assets/scrollbar.module.scss';
import { OrderOfSorting } from '../../../../../types/OrderOfSorting.type';
import { Sorting } from '../../../../../types/Sorting.type';
import { Task as TaskType } from '../../../../../types/Task.type';
import { TasksStructure } from '../../../../../types/TasksStructure.interface';
import { Task } from '../task/Task';
import { Title } from './SectionTitle';
export function Section({
	title,
	tasks,
	type,
	setSections,
	setTasksStructure,
	tasksStructure,
	editable,
	isCalendar,
	realTitle,
}: {
	title: string;
	tasks: TaskType[];
	type: SECTION;
	setTasksStructure: Updater<TasksStructure>;
	tasksStructure: TasksStructure;
	setSections: Updater<string[]>;
	editable: boolean;
	isCalendar?: boolean;
	sorting?: Sorting;
	order?: OrderOfSorting;
	realTitle?: string;
}) {
	//State
	const [height, setHeight] = useState<Height>('auto');
	const [isEdit, setIsEdit] = useState(false);
	const [visible, setVisible] = useState(false);
	const inputTitle = useRef<null | HTMLInputElement>(null);
	const container1 = useRef<null | HTMLDivElement>(null);
	const container2 = useRef<null | HTMLDivElement>(null);

	//UseEffects

	useEffect(() => {
		if (container1.current) {
			container1.current.style.minHeight =
				Math.round(
					document.documentElement.clientHeight -
						container1.current.getBoundingClientRect().top -
						20
				) + 'px';
		}
	}, []);

	useEffect(() => {
		if (container2.current) {
			container2.current.style.minHeight =
				Math.round(
					document.documentElement.clientHeight -
						container2.current.getBoundingClientRect().top -
						20
				) + 'px';
		}
	});
	console.log(title,realTitle)

	return (
		<div
			className={`flex flex-col gap-y-3.5 h-full ${
				type === SECTION.SMALL && 'w-[340px] self-start'
			}`}
		>
			<Title
				isCalendar={isCalendar}
				isEmpty={tasks.length === 0}
				type={type}
				editable={editable}
				setHeight={setHeight}
				title={title}
				height={height}
				inputTitle={inputTitle}
				isEdit={isEdit}
				visible={visible}
				setIsEdit={setIsEdit}
				setSections={setSections}
				setTasksStructure={setTasksStructure}
				setVisible={setVisible}
			/>
			<div
				ref={type === SECTION.SMALL ? container1 : undefined}
				className={`overflow-x-hidden ${
					type === SECTION.SMALL ? `w-[340px] ${styles.element}` : ''
				}`}
			>
				<Droppable
					key={isCalendar && realTitle ? `${realTitle}` : title}
					droppableId={isCalendar && realTitle ? `${realTitle}` : title}
					renderClone={(provided, snapshot, rubric) => {
						return (
							<div
								{...provided.dragHandleProps}
								{...provided.draggableProps}
								ref={provided.innerRef}
							>
								<Task
									tasksStructure={tasksStructure}
									type={type}
									{...(sectionService.getTask(tasksStructure, rubric) as TaskType)}
									index={0}
									setTasksStructure={setTasksStructure}
									isClone
								/>
							</div>
						);
					}}
				>
					{(provided, snapshot) => {
						if (tasks.length > 0 || type === SECTION.LARGE) {
							return (
								<div ref={provided.innerRef} {...provided.droppableProps}>
									<AnimateHeight height={height}>
										<div
											className={` flex flex-col ${
												type === SECTION.SMALL && `items-center ${styles.element}`
											} ${
												snapshot.isDraggingOver && 'bg-nav rounded-classic pl-2 pr-2'
											}  gap-y-3.5 overflow-x-hidden
									`}
										>
											{tasks.map((currentTask, index) => (
												<Task
													tasksStructure={tasksStructure}
													setTasksStructure={setTasksStructure}
													{...currentTask}
													index={index}
													type={type}
													key={v4()}
												/>
											))}
											{provided.placeholder}
										</div>
									</AnimateHeight>
								</div>
							);
						} else {
							return (
								<div ref={provided.innerRef} {...provided.droppableProps}>
									<div
										ref={container2}
										className={`${
											snapshot.isDraggingOver ? 'bg-nav/30' : 'bg-nav/5'
										} grid transition-colors duration-500 row-[2] place-content-center min-w-full min-h-full rounded-classic border border-solid border-main`}
									>
										{snapshot.isDraggingOver ? (
											<span className='text-lg font-bold'>Move over</span>
										) : (
											<Fragment>
												<span className='text-lg font-bold'>
													{isCalendar ? 'There`re no tasks' : `There are no tasks in ${title}`}
													.
												</span>
												<span className='font-medium text-center'>Drag task to add it.</span>
											</Fragment>
										)}
									</div>
								</div>
							);
						}
					}}
				</Droppable>
			</div>
		</div>
	);
}
