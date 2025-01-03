import { useContext, useMemo, useRef, useState } from 'react';
import AnimateHeight, { Height } from 'react-animate-height';
import { useImmer } from 'use-immer';
import {
	NotificationContext,
	NotificationContextType,
} from '../../../../../context/Notification.context';
import { ReRenderContext, ReRenderContextType } from '../../../../../context/ReRender.context';
import { SectionContextType, SectionsContext } from '../../../../../context/Sections.context';
import { modifyTaskService } from '../../../../../services/task/ModifyTask.service';
import { taskService } from '../../../../../services/task/Task.service';
import { SETTINGS } from '../../../../../settings/Settings';
import { EditableTaskProps } from '../../../../../types/EditableTaskProps.interface';
import { Menu } from '../../../../../types/Menu.type';
import { TaskInfo } from '../../../../../types/TaskInfo.interface';
import { Button } from '../../../../ui/Button';
import { Input } from '../../../../ui/Input';
import { BreadCrumbs } from '../../addTask/BreadCrumbs';

export function EditBoardTask({
	date,
	label,
	priority,
	description,
	title,
	setTasksStructure,
	setEdit,
	section,
	id,
	createdAt,
	time,
	tasksStructure,
}: EditableTaskProps) {
	//Context

	const { setMessage, setOnReject, setOnConfirm } = useContext(
		NotificationContext
	) as NotificationContextType;
	const [sections] = useContext(SectionsContext) as SectionContextType;
	const [, setUpdate] = useContext(ReRenderContext) as ReRenderContextType;
	const defaultTaskInfo: TaskInfo = useMemo(() => {
		return {
			title,
			description,
			date,
			priority,
			label,
			section,
			createdAt,
			time,
		};
	}, []);

	const [taskInfo, setTaskInfo] = useImmer(defaultTaskInfo);
	const [height, setHeight] = useState<Height>(0);
	const [menu, setMenu] = useState<Menu | undefined>(undefined);
	const [error, setError] = useState('');
	const titleRef = useRef<null | HTMLInputElement>(null);
	const descriptionRef = useRef<null | HTMLInputElement>(null);
	const [disabled, setDisabled] = useState(false);

	return (
		<div className='w-[320px] bg-main flex flex-col gap-y-1.5 pt-1.5 pb-3 pr-2 pl-2 border border-solid border-main rounded-classic'>
			<div className='flex flex-col gap-y-3 mb-1.5'>
				<AnimateHeight height={height}>
					<Input
						value={label ? label : ''}
						onChange={e => {
							setTaskInfo(prev => {
								prev.label = e.target.value;
							});
						}}
						maxLength={SETTINGS.LABEL}
						title='Label'
					/>
				</AnimateHeight>
				<Input
					value={title}
					styles='bg-transparent'
					input={titleRef}
					onChange={e => {
						modifyTaskService.handleInputChange(
							e,
							true,
							setError,
							tasksStructure,
							setTaskInfo,
							setDisabled,
							descriptionRef
						);
					}}
					maxLength={SETTINGS.TITLE}
					title='Title'
				/>
				<Input
					value={description}
					input={descriptionRef}
					onChange={e => {
						modifyTaskService.handleInputChange(
							e,
							false,
							setError,
							tasksStructure,
							setTaskInfo,
							setDisabled,
							titleRef
						);
					}}
					maxLength={SETTINGS.DESCRIPTION}
					title='Description'
				/>
			</div>
			<div className='flex flex-col gap-y-3'>
				<BreadCrumbs
					sections={sections}
					taskInfo={taskInfo}
					defaultDateValue={date}
					inline
					menu={menu}
					setMenu={setMenu}
					setHeight={setHeight}
					setTaskInfo={setTaskInfo}
				/>
				<div className='flex items-center'>
					<div className={`flex gap-x-2`}>
						<Button
							styles='min-h-[24px] bg-white text-black'
							content='Cancel'
							onClick={() => {
								taskService.resetEditedTask(
									titleRef,
									descriptionRef,
									setMenu,
									setTaskInfo,
									defaultTaskInfo
								);
								setEdit(false);
							}}
						/>
						<Button
							content='Save'
							styles='min-h-[24px] bg-blue text-white'
							onClick={() => {
								taskService.saveTask(
									setMessage,
									taskInfo,
									setOnConfirm,
									setOnReject,
									setTasksStructure,
									id,
									setEdit,
									setUpdate,
									titleRef,
									descriptionRef,
									setMenu,
									setTaskInfo,
									defaultTaskInfo
								);
							}}
							disabled={disabled}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
