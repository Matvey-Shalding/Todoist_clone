import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { DISPLAYS } from '../../../../../constants/Displays';
import { FILTERS } from '../../../../../constants/Filters';
import { SORTING } from '../../../../../constants/Sorting';
import '../../../../../styles/lib/Menu.scss';
import { Displays } from '../../../../../types/Displays.type';
import { Filter } from '../../../../../types/Filter.type';
import { Grouping } from '../../../../../types/Grouping.type';
import { OrderOfSorting } from '../../../../../types/OrderOfSorting.type';
import { Sorting } from '../../../../../types/Sorting.type';
import { DisplayMode } from './DisplayMode';
import { GroupingSubMenu } from './subMenus/GroupingSubMenu';
import { OrderSubMenu } from './subMenus/OrderSubMenu';
import { SortingSubMenu } from './subMenus/SortingSubMenu';
export function PickDisplayMenu({
	setDisplay,
	display,
	setGrouping,
	setMenuOpen,
	setSorting,
	setOrderOfSorting,
	grouping,
	sorting,
	orderOfSorting,
	menuOpen,
}: {
	setDisplay: React.Dispatch<React.SetStateAction<Displays>>;
	display: Displays;
	setGrouping: React.Dispatch<React.SetStateAction<Grouping>>;
	menuOpen: boolean;
	setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSorting: React.Dispatch<React.SetStateAction<Sorting>>;
	setOrderOfSorting: React.Dispatch<React.SetStateAction<OrderOfSorting>>;
	grouping: Grouping;
	sorting: Sorting;
	orderOfSorting: OrderOfSorting;
}) {
	const [open, setOpen] = useState<Filter | undefined>();

	return (
		<motion.div
			initial={{
				height: 0,
				padding: 0,
			}}
			animate={{
				height: !menuOpen ? 0 : 'auto',
				padding: !menuOpen ? 0 : 10,
			}}
			className={`z-[10000000] ${
				!menuOpen ? 'pointer-events-none p-0' : 'pointer-events-auto  p-2.5'
			} bg-nav right-0 top-full absolute w-80 shadow-light rounded-classic shadow-small'
			}`}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{
					opacity: !menuOpen ? 0 : 1,
					transition: {
						opacity: {
							delay: 0.15,
							duration: 0.1,
						},
					},
				}}
				exit={{
					opacity: !menuOpen ? 0 : 1,
				}}
				className='flex flex-col gap-y-2 relative z-[1000] bg-nav'
			>
				<div className='pb-2 relative z-[1000] gap-y-2.5 flex flex-col border-b border-solid border-main'>
					<h6 className='font-bold text-lg'>Display</h6>
					<div className='flex gap-x-0.5 h-16 rounded-classic bg-nav p-0.5 relative z-[1000]'>
						<DisplayMode
							setDisplay={setDisplay}
							setMenuOpen={setMenuOpen}
							mode={DISPLAYS.LIST}
							isActive={display === DISPLAYS.LIST}
						/>
						<DisplayMode
							setDisplay={setDisplay}
							setMenuOpen={setMenuOpen}
							mode={DISPLAYS.BOARD}
							isActive={display === DISPLAYS.BOARD}
						/>
						<DisplayMode
							setDisplay={setDisplay}
							setMenuOpen={setMenuOpen}
							mode={DISPLAYS.CALENDAR}
							isActive={display === DISPLAYS.CALENDAR}
						/>
					</div>
				</div>
				<div className='flex flex-col gap-y-2'>
					<h6 className='font-bold text-lg'>Sorting</h6>
					{display !== DISPLAYS.CALENDAR && (
						<div
							onClick={() =>
								void setOpen(prev =>
									prev === FILTERS.GROUPING ? undefined : FILTERS.GROUPING
								)
							}
							className='flex gap-x-2 relative'
						>
							<GroupingSubMenu grouping={grouping} setGrouping={setGrouping} type={open} />
							<img
								className='w-5 h-5'
								src='/img/main/incoming_tab/grouping.svg'
								alt='Grouping'
							/>
							<span>Grouping</span>
							<span className='text-slate-400'>{grouping}</span>
						</div>
					)}
					<div
						onClick={() =>
							void setOpen(prev => (prev === FILTERS.SORTING ? undefined : FILTERS.SORTING))
						}
						className='flex gap-x-2 relative'
					>
						<SortingSubMenu
							setSorting={setSorting}
							type={open}
							isCalendar={display == DISPLAYS.CALENDAR}
						/>
						<img className='w-5 h-5' src='/img/main/incoming_tab/sorting.svg' alt='Sorting' />
						<span>Sorting</span>
						<span className='text-slate-400'>
							{sorting === SORTING.DEFAULT && display == DISPLAYS.CALENDAR
								? SORTING.NO
								: sorting}
						</span>
					</div>
					{sorting !== SORTING.DEFAULT && (
						<div
							onClick={() =>
								void setOpen(prev => (prev === FILTERS.ORDER ? undefined : FILTERS.ORDER))
							}
							className='flex gap-x-2 relative'
						>
							<OrderSubMenu order={orderOfSorting} setOrder={setOrderOfSorting} type={open} />
							<img
								className='w-5 h-5'
								src='/img/main/incoming_tab/order_of_sorting.svg'
								alt='Direction'
							/>
							<span>Direction</span>
							<span className='text-slate-400'>{orderOfSorting}</span>
						</div>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
}
