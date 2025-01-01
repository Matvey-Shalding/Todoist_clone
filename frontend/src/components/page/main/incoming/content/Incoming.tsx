import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Updater } from 'use-immer';
import { DISPLAYS } from '../../../../../constants/Displays';
import { ORDEROFSORTING } from '../../../../../constants/OrderOfSorting';
import { SORTING } from '../../../../../constants/Sorting';
import { GroupingContext, GroupingContextType } from '../../../../../context/Grouping';
import {
	NotificationContext,
	NotificationContextType,
} from '../../../../../context/Notification.context';
import { ReRenderContext, ReRenderContextType } from '../../../../../context/ReRender.context';
import { incomingService } from '../../../../../services/incoming/Incoming.service';
import { Displays } from '../../../../../types/Displays.type';
import { OrderOfSorting } from '../../../../../types/OrderOfSorting.type';
import { Sorting } from '../../../../../types/Sorting.type';
import { TasksStructure } from '../../../../../types/TasksStructure.interface';
import { PickDisplayMenu } from '../pickDisplayMenu/PickDisplayMenu';
import { RenderDisplay } from './RenderDisplay';

export default function Main({
	tasksStructure,
	setSections,
	sections,
	setTasksStructure,
}: {
	tasksStructure: TasksStructure;
	setTasksStructure: Updater<TasksStructure>;
	sections: string[];
	setSections: Updater<string[]>;
}) {
	//Context
	const [update, setUpdate] = useContext(ReRenderContext) as ReRenderContextType;

	const [grouping, setGrouping] = useContext(GroupingContext) as GroupingContextType;

	const { setMessage, setOnConfirm, setOnReject } = useContext(
		NotificationContext
	) as unknown as NotificationContextType;

	//State

	const [sorting, setSorting] = useState<Sorting>(SORTING.DEFAULT);
	const [orderOfSorting, setOrderOfSorting] = useState<OrderOfSorting>(ORDEROFSORTING.DEFAULT);

	//UseEffects

	//Animating appearance of Main component

	useEffect(() => {
		AOS.init();
	}, []);
	const [open, setOpen] = useState<boolean>(false);
	const container = useRef<null | HTMLDivElement>(null);
	const [display, setDisplay] = useState<Displays>(DISPLAYS.LIST);
	const [isEmpty, setIsEmpty] = useState(false);
	const [triggerRender, setTriggerRender] = useState('');
	//Effects

	useEffect(() => {
		setIsEmpty(incomingService.isEmpty(tasksStructure));
	}, [tasksStructure]);

	useEffect(() => {
		if (container.current) {
			container.current.style.height =
				document.documentElement.clientHeight -
				container.current.getBoundingClientRect().top -
				100 +
				'px';
		}
	}, []);

	useEffect(() => {
		incomingService.updateTasksStructure(
			grouping,
			setTasksStructure,
			sections,
			sorting,
			orderOfSorting
		);
	}, [grouping, sections, sorting, orderOfSorting, update, triggerRender]);

	return (
		<DragDropContext
			onDragEnd={e =>
				incomingService.handleDragEnd(
					setTriggerRender,
					e,
					setTasksStructure,
					grouping,
					setMessage,
					setOnConfirm,
					setOnReject,
					display
				)
			}
		>
			<div data-aos-duration='300' data-aos='slide-left' className='basis-full bg-main'>
				<div className='flex flex-grow-0 flex-shrink-0 flex-col gap-y-4 pt-7 min-h-screen'>
					<div className='w-full pl-6 pr-6'>
						<div
							className={`flex justify-between items-center ${
								display !== DISPLAYS.CALENDAR && 'border-b border-solid border-main pb-2'
							}`}
						>
							<h2 className='font-bold text-2xl'>Incoming</h2>
							<div className='relative flex gap-x-2 items-center'>
								<PickDisplayMenu
									setMenuOpen={setOpen}
									setDisplay={setDisplay}
									display={display}
									setGrouping={setGrouping}
									setSorting={setSorting}
									setOrderOfSorting={setOrderOfSorting}
									menuOpen={open}
									grouping={grouping}
									sorting={sorting}
									orderOfSorting={orderOfSorting}
								/>
								<img
									onClick={() => void setOpen(prev => !prev)}
									className='w-4 h-4'
									src='/img/main/incoming_tab/filter.svg'
									alt='Sort'
								/>
								<button onClick={() => void setOpen(prev => !prev)} className='font-bold'>
									Display
								</button>
							</div>
						</div>
					</div>
					<div ref={container} className={`grid ${isEmpty && 'place-content-center'}`}>
						{isEmpty ? (
							<div className='flex flex-col gap-y-2 justify-center items-center'>
								<span className='text-2xl font-bold'>All your tasks are completed!</span>
								<span className='max-w-[270px] font-light text-sm'>
									Click 'Add task' in order to create new task
								</span>
							</div>
						) : (
							<RenderDisplay
								setTasksStructure={setTasksStructure}
								sections={sections}
								setSections={setSections}
								direction={orderOfSorting}
								sorting={sorting}
								display={display}
								tasks={tasksStructure}
								grouping={grouping}
							/>
						)}
					</div>
				</div>
			</div>
		</DragDropContext>
	);
}
