import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useContext, useMemo, useRef, useState } from 'react';
import AnimateHeight, { Height } from 'react-animate-height';
import { Updater, useImmer } from 'use-immer';
import { MENUS } from '../../../../constants/Menus';
import { ModalContext, ModalContextType } from '../../../../context/Modal.context';
import {
	NotificationContext,
	NotificationContextType,
} from '../../../../context/Notification.context';
import { addTaskService } from '../../../../services/addTask/AddTask.service';
import { modifyTaskService } from '../../../../services/task/ModifyTask.service';
import { Grouping } from '../../../../types/Grouping.type';
import { Menu } from '../../../../types/Menu.type';
import { TaskInfo } from '../../../../types/TaskInfo.interface';
import { TasksStructure } from '../../../../types/TasksStructure.interface';
import { Button } from '../../../ui/Button';
import { Input } from '../../../ui/Input';
import { BreadCrumbs } from './BreadCrumbs';
import { SectionMenu } from './SectionMenu';
import { SETTINGS } from '../../../../settings/Settings';
export default function AddTask({
	setTasksStructure,
	grouping,
	sections,
	tasksStructure,
}: {
	setTasksStructure: Updater<TasksStructure>;
	grouping: Grouping;
	sections: string[];
	setModalOpen: Dispatch<SetStateAction<boolean>>;
	tasksStructure: TasksStructure;
}) {
	//Context
	const { setMessage, setOnReject, setOnConfirm } = useContext(
		NotificationContext
	) as NotificationContextType;
	const [task, setTask] = useImmer<TaskInfo>(addTaskService.defaultTaskInfo);
	const [height, setHeight] = useState<Height>(0);
	const [menu, setMenu] = useState<Menu | undefined>(undefined);
	const [error, setError] = useState('');
	const title = useRef<null | HTMLInputElement>(null);
	const description = useRef<null | HTMLInputElement>(null);
	const [open, setOpen] = useContext(ModalContext) as ModalContextType;
	const disabled = useMemo(() => {
		return !(
			title.current &&
			description.current &&
			title.current.value &&
			description.current.value
		);
	}, [task, title, description]);
	return (
		<div
			className={`fixed z-[3] transition-opacity duration-500 bg-black/20 w-screen h-screen ${
				open ? 'pointer-events-auto opacity-1' : 'pointer-events-none opacity-0'
			}`}
			onClick={() => {
				!menu && setOpen(false);
				setMenu(undefined);
			}}
		>
			<motion.div
				transition={{ duration: 0.3 }}
				initial={{ top: 0, opacity: 0 }}
				animate={{ top: open ? 30 : 0, opacity: open ? 1 : 0 }}
				onClick={e => void e.stopPropagation()}
				className={`bg-nav ${
					open ? 'pointer-events-auto' : 'pointer-events-none'
				} p-3 pt-3 pb-4 flex flex-col absolute left-[calc(50%+140px)] -translate-x-[50%] top-0
			w-[500px] z-[4] shadow-task min-h-[175px] rounded-classic
			`}
			>
				<div className='flex flex-col gap-y-3 mb-4'>
					<AnimateHeight height={height}>
						<Input
							onChange={e => {
								setTask(prev => {
									prev.label = e.target.value;
								});
							}}
							maxLength={SETTINGS.LABEL}
							title='Label'
						/>
					</AnimateHeight>
					<Input
						input={title}
						onChange={e => {
							modifyTaskService.handleInputChange(e, true, setError, tasksStructure, setTask);
						}}
						maxLength={SETTINGS.TITLE}
						title='Title'
					/>
					<Input
						input={description}
						onChange={e => {
							modifyTaskService.handleInputChange(e, false, setError, tasksStructure, setTask);
						}}
						maxLength={SETTINGS.DESCRIPTION}
						title='Description'
					/>
				</div>
				<BreadCrumbs
					taskInfo={task}
					setMenu={setMenu}
					menu={menu}
					setTaskInfo={setTask}
					setHeight={setHeight}
					sections={sections}
				/>
				<div className='mt-4 pt-4 border-t border-solid border-main flex justify-between items-center'>
					<div className='flex gap-x-2 basis-full justify-end text'>
						<Button
							styles='bg-white text-black'
							content='Cancel'
							onClick={() => {
								if (title.current && description.current) {
									title.current.value = '';
									description.current.value = '';
								}
								addTaskService.reset(setMenu, setHeight, setTask);
								setOpen(false);
							}}
						/>
						<Button
							content='Add task'
							onClick={() => {
								if (title.current && description.current) {
									title.current.value = '';
									description.current.value = '';
								}
								addTaskService.add(
									task,
									setTasksStructure,
									grouping,
									setOpen,
									setOnReject,
									setOnConfirm,
									setMessage,
									setMenu,
									setHeight,
									setTask
								);
							}}
							disabled={disabled}
							styles='bg-blue text-white'
						/>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
