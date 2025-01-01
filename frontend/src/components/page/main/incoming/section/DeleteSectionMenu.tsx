import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Updater } from 'use-immer';
import { sectionService } from '../../../../../services/section/Section.service';
import { TasksStructure } from '../../../../../types/TasksStructure.interface';
import { Button } from '../../../../ui/Button';
import { Checkbox } from '../../../../ui/Checkbox';
export default function DeleteSectionMenu({
	open,
	setModalOpen,
	setOpen,
	title,
	setSections,
	setTasksStructure,
}: {
	open: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	title: string;
	setTasksStructure: Updater<TasksStructure>;
	setSections: Updater<string[]>;
}) {
	const [checked, setChecked] = useState(false);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: open ? 1 : 0 }}
			onClick={() => void setModalOpen(false)}
			className={`fixed z-[100000000] top-0  bg-black/20 right-0 w-screen h-screen pointer-events-none`}
		>
			<motion.div
				transition={{ duration: 0.3 }}
				initial={{ top: 0, opacity: 0 }}
				animate={{ top: open ? 30 : 0, opacity: open ? 1 : 0 }}
				onDoubleClick={e => void e.stopPropagation()}
				onClick={e => void e.stopPropagation()}
				className={`bg-zinc-900 ${
					open ? 'pointer-events-auto' : 'pointer-events-none'
				} w-[450px] flex flex-col shadow-task  rounded-classic fixed left-1/2 -translate-x-1/2 z-[1000000000]
				pt-2 pb-2 pl-1`}
			>
				<div className='pl-2 mb-5 flex flex-col gap-y-1 border-b border-solid border-main pb-2'>
					<span className='font-medium text-xl'>Delete section?</span>
					<span className=''>
						The <span className='font-bold'>{title}</span> will be deleted permanently
					</span>
				</div>
				<div className={`flex items-center pl-2 pr-2 justify-between`}>
					<label className='self-end'>
						<div className='flex gap-x-0.5 pb-2 items-center'>
							<Checkbox onChange={() => setChecked(prev => !prev)} />
							<span className='text-lg'>Delete tasks</span>
						</div>
					</label>
					<div className='flex gap-x-1.5 items-center'>
						<Button
							content='Cancel'
							onClick={() => {
								setOpen(false);
							}}
							styles='min-h-[34px] bg-white text-black'
						/>
						<Button
							content='Confirm'
							onClick={() => {
								sectionService.deleteSection(title, setTasksStructure, setSections, checked);
								setOpen(false);
							}}
							styles='text-white bg-blue min-h-[34px]'
						/>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
