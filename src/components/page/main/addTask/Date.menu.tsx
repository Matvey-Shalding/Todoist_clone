import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Updater } from 'use-immer';
import { dateMenuService } from '../../../../services/menu/DateMenu.service';
import '../../../../styles/lib/DayPicker.scss';
import { Menu } from '../../../../types/Menu.type';
import { TaskInfo } from '../../../../types/TaskInfo.interface';
import { displayDate } from '../../../../utils/displayDate';
import { Button } from '../../../ui/Button';

import { PRESET_FORMAT } from '../../../../constants/DateFormat';
import styles from '../../../../styles/assets/scrollbar.module.scss';
export const DateMenu = function ({
	open,
	setMenu,
	inline,
	date,
	setTaskInfo,
	taskInfo,
}: {
	date: Date | undefined;
	setTaskInfo: Updater<TaskInfo>;
	open: boolean;
	setMenu: React.Dispatch<React.SetStateAction<Menu | undefined>>;
	inline?: boolean;
	taskInfo: TaskInfo;
}) {
	//State
	const [selected, setSelected] = useState<Date | undefined>(date);
	const [timeValue, setTimeValue] = useState<string>('');
	const timeInput = useRef<null | HTMLInputElement>(null);
	const disabled = useMemo(() => {
		return dateMenuService.isDisabled(timeValue, taskInfo);
	}, [timeValue]);
	const modal = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (modal.current) {
			modal.current.style.maxHeight =
				document.documentElement.clientHeight -
				20 -
				modal.current.getBoundingClientRect().top +
				'px';
		}
	}, []);
	return (
		<motion.div
			ref={modal}
			initial={{
				height: 0,
				padding: 0,
			}}
			animate={{
				height: open ? 'auto' : 0,
				paddingTop: open ? 12 : 0,
				paddingBottom: open ? 12 : 0,
			}}
			className={`
					w-[280px] -top-16 ${styles.element} overflow-y-scroll -translate-y-9 pt-3 pb-3  ${
				!inline && 'absolute'
			} z-[5]
					rounded-classic shadow-small
					transition-opacity bg-nav duration-500
					}`}
		>
			<motion.div
				className=' flex-col gap-y-2.5 flex'
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
				exit={{
					opacity: open ? 1 : 0,
					transition: {
						duration: 3,
					},
				}}
			>
				<div className='pt-3 pb-3 pl-2 border-b border-main border-solid'>
					{displayDate(taskInfo.date, taskInfo.time)}
				</div>
				<div className='border-main border-b border-solid pb-2 flex flex-col'>
					{dateMenuService.presets.map(item => {
						return (
							<div
								onClick={e =>
									void dateMenuService.onPresetClick(setTaskInfo, item, setSelected, setMenu)
								}
								className='flex hover:bg-hover justify-between items-center pl-3 pr-3 pt-2 pb-2'
							>
								<div className='flex gap-x-2 items-center'>
									<img className='inline-block w-5 h-5' src={item.img} alt={item.content} />
									<span className='font-semibold text-sm'>{item.content}</span>
								</div>
								<span className='text-xs'>
									{item?.date && PRESET_FORMAT.format(item?.date)}
								</span>
							</div>
						);
					})}
				</div>
				<div className='relative right-3'>
					<DayPicker
						showOutsideDays
						weekStartsOn={1}
						modifiersClassNames={{ selected: 'my-today', today: 'today' }}
						mode='single'
						fromDate={new Date()}
						selected={selected}
						onSelect={day =>
							void dateMenuService.onSelect(day, setSelected, setTaskInfo, setMenu)
						}
					/>
				</div>
				<div className='border-t border-main border-solid pt-3 pl-3 pr-3 flex flex-col gap-y-3'>
					<div className='flex items-center'>
						<span className='text-lg font-semibold'>Time</span>
						<input
							ref={timeInput}
							className='ml-2.5 max-h-[37px] max-w-[198px] p-1.5 border border-main border-solid text-white flex items-center rounded-classic bg-zinc-900'
							type='text'
							placeholder={String(new Date().getHours() + 1) + ':00'}
							onChange={e => setTimeValue(e.target.value)}
						/>
					</div>
					<div className='basis-full flex justify-end gap-x-1.5'>
						<Button
							content='Cancel'
							styles='bg-white text-black'
							onClick={() =>
								void dateMenuService.onCancel(setTaskInfo, setTimeValue, timeInput)
							}
						/>
						<Button
							onClick={() =>
								void dateMenuService.onConfirm(
									setTaskInfo,
									setTimeValue,
									timeInput,
									timeValue,
									setMenu,
									taskInfo
								)
							}
							content='Save time'
							disabled={disabled}
							styles='bg-blue text-white'
						/>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};
