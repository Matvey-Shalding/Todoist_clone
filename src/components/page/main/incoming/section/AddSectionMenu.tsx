import { useState } from 'react';
import { Updater } from 'use-immer';
import { sectionService } from '../../../../../services/section/Section.service';
import { TasksStructure } from '../../../../../types/TasksStructure.interface';
import { Button } from '../../../../ui/Button';
import { Input } from '../../../../ui/Input';
import { SETTINGS } from '../../../../../settings/Settings';

export default function AddSection({
	setSections,
	setTasksStructure,
}: {
	setSections: Updater<Array<string>>;
	setTasksStructure: Updater<TasksStructure>;
}) {
	const [section, setSection] = useState('');
	const [open, setOpen] = useState<boolean>(false);
	if (open) {
		return (
			<div className='inline-flex min-w-[192px] mt-2 ml-3 shadow-tiny self-start h-min flex-col gap-y-2 bg-zinc-900  p-2 rounded-classic'>
				<Input
					maxLength={SETTINGS.SECTION}
					styles='bg-transparent'
					onChange={e => {
						setSection(e.target.value);
					}}
					title='Section'
				/>
				<div className='flex gap-x-2 justify-end'>
					<Button
						styles='bg-white text-black'
						content='Cancel'
						onClick={() => void setOpen(false)}
					/>
					<Button
						content='Add section'
						disabled={!section.length}
						styles='text-white bg-blue'
						onClick={() =>
							void sectionService.addSection(setSections, section, setOpen, setTasksStructure)
						}
					/>
				</div>
			</div>
		);
	} else {
		return (
			<button
				onClick={() => {
					setOpen(true);
				}}
				className='min-w-48 mt-2 ml-3 duration-300 transition-colors hover:bg-hover self-start bg-nav shadow-tiny rounded-classic h-10 pl-5 flex items-center gap-x-3'
			>
				<img
					className='w-4 h-4'
					src='/img/main/incoming_tab/add_section.svg'
					alt='Add section'
				/>
				<span className='text-lg text-white'>Add section</span>
			</button>
		);
	}
}
