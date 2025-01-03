import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Updater } from 'use-immer';
import { calendarService } from '../../../../../../services/calendar/Calendar.service';
import '../../../../../../styles/lib/DayPicker.scss';
import { OrderOfSorting } from '../../../../../../types/OrderOfSorting.type';
import { Sorting } from '../../../../../../types/Sorting.type';
import { TasksStructure } from '../../../../../../types/TasksStructure.interface';
import { Week } from './Week';

export function Calendar({
	tasksStructure,
	sorting,
	direction,
	setTasksStructure,
	setSections,
}: {
	setSections: Updater<string[]>;
	tasksStructure: TasksStructure;
	sorting: Sorting;
	direction: OrderOfSorting;
	setTasksStructure: Updater<TasksStructure>;
}) {
	//State

	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<Date | undefined>(new Date());
	const [weekOffset, setWeekOffset] = useState(0);
	let width: string = '';
	const navWidth = useRef<null | HTMLDivElement>(null);
	useEffect(() => {
		console.log(weekOffset);
	}, [weekOffset]);
	//UseEffects

	useEffect(() => {
		if (navWidth.current) {
			navWidth.current.style.width =
				document.documentElement.clientWidth -
				navWidth.current.getBoundingClientRect().left -
				24 +
				'px';
			width =
				document.documentElement.clientWidth -
				navWidth.current.getBoundingClientRect().left -
				24 +
				'px !important';
		}
	}, []);

	useEffect(() => {
		calendarService.handleDateChange(selected, open, setWeekOffset);
	}, [selected]);

	return (
		<div className='flex flex-col gap-y-4 -mt-2.5'>
			<div className='flex pr-6 items-center justify-between border-t border-solid border-main pt-2 ml-6'>
				<div className='flex relative flex-row items-center gap-x-2'>
					<span onClick={() => void setOpen(prev => !prev)} className='text-xl font-bold'>
						{calendarService.generateWeekTitle(weekOffset)}
					</span>
					<div>
						<img
							onClick={() => void setOpen(prev => !prev)}
							className='block w-3.5 h-3.5'
							src='/img/navigation/menu-arrow-white.svg'
							alt=''
						/>
					</div>
					<motion.div
						initial={{ height: 0, padding: 0 }}
						animate={{
							height: open ? 'auto' : 0,
							padding: open ? '4px 0' : 0,
						}}
						className={`absolute ${
							open ? 'pointer-events-auto' : 'pointer-events-none'
						} top-full translate-y-2 left-0 bg-nav shadow-tiny rounded-classic pt-1 pb-1 z-10
						}`}
					>
						<motion.div
							exit={{
								opacity: open ? 1 : 0,
								transition: {
									duration: 3,
								},
							}}
							initial={{ opacity: 0 }}
							animate={{
								opacity: open ? 1 : 0,
								transition: {
									opacity: {
										delay: 0.15,
										duration: 0.1,
									},
								},
							}}
						>
							<DayPicker
								showOutsideDays
								weekStartsOn={1}
								modifiersClassNames={{ selected: 'my-today', today: 'today' }}
								mode='single'
								fromDate={new Date()}
								selected={selected}
								onSelect={prev => {
									setSelected(prev);
									setTimeout(() => {
										setOpen(false);
									}, 300);
								}}
							/>
						</motion.div>
					</motion.div>
				</div>
				<div className='flex text-sm h-8 items-center rounded-md border border-solid border-main'>
					<button
						disabled={weekOffset === 0}
						onClick={() => void calendarService.handleArrowClick(setWeekOffset, false)}
						className='h-full pl-2 pr-2 disabled:cursor-not-allowed'
					>
						<img
							className='block w-2.5 h-2.5 rotate-90'
							src='/img/navigation/menu-arrow-white.svg'
							alt=''
						/>
					</button>
					<button
						onClick={() => void setWeekOffset(0)}
						className='h-full pl-2 pr-2 border-l border-r border-solid border-main'
					>
						Today
					</button>
					<button
						onClick={() => void calendarService.handleArrowClick(setWeekOffset, true)}
						className='h-full pl-2 pr-2'
					>
						<img
							className='block w-2.5 h-2.5 -rotate-90'
							src='/img/navigation/menu-arrow-white.svg'
							alt=''
						/>
					</button>
				</div>
			</div>
			<Week
				weekOffSet={weekOffset}
				order={direction}
				sorting={sorting}
				tasksStructure={tasksStructure}
				setSections={setSections}
				setTasksStructure={setTasksStructure}
			></Week>
		</div>
	);
}
