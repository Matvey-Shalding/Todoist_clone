import { useContext, useMemo } from 'react';
import { useImmer } from 'use-immer';
import { GroupingContext, GroupingContextType } from '../../../../../context/Grouping';
import {
	NotificationContext,
	NotificationContextType,
} from '../../../../../context/Notification.context';
import { taskService } from '../../../../../services/task/Task.service';
import '../../../../../styles/lib/DayPicker.scss';
import { TaskProps } from '../../../../../types/Task.type';
import { TaskInfo } from '../../../../../types/TaskInfo.interface';
import { displayDate } from '../../../../../utils/displayDate';
import { displayImage } from '../../../../../utils/displayImage';
import { Checkbox } from '../../../../ui/Checkbox';
import { EditBoardTask } from './EditBoardTask';
export function ListTask({
	edit,
	label,
	priority,
	title,
	description,
	setTasksStructure,
	id,
	section,
	date,
	createdAt,
	setEdit,
	time,
	tasksStructure,
}: TaskProps) {
	//Context
	const [grouping] = useContext(GroupingContext) as GroupingContextType;
	const { setMessage, setOnConfirm, setOnReject } = useContext(
		NotificationContext
	) as NotificationContextType;
	//UseMemo

	const defaultTask: TaskInfo = useMemo(() => {
		return {
			section,
			date,
			label,
			priority,
			title,
			description,
			createdAt,
			time,
		};
	}, []);

	//State

	const [task, setTaskInfo] = useImmer<TaskInfo>(defaultTask);

	if (edit) {
		return (
			<EditBoardTask
				tasksStructure={tasksStructure}
				time={time}
				date={date}
				label={label}
				priority={priority}
				setTaskInfo={setTaskInfo}
				task={task}
				setEdit={setEdit}
				title={title}
				description={description}
				setTasksStructure={setTasksStructure}
				id={id}
				section={section}
				createdAt={createdAt}
			/>
		);
	} else {
		return (
			<div className='flex flex-col gap-y-3 border-b border-solid border-main pb-3'>
				<div className={`${(label || priority) && 'flex justify-between items-center'}`}>
					<div className='flex gap-x-1'>
						<Checkbox
							onChange={e => {
								if (e.target.checked) {
									taskService.hide(
										setTasksStructure,
										grouping,
										date,
										id,
										priority,
										label,
										section,
										setOnConfirm,
										setOnReject,
										setMessage,
										title,
										true
									);
								}
							}}
						/>
						<h3 className='text-xl self-start'>{`${title}`}</h3>
					</div>
					{(label || priority) && (
						<div className='flex gap-x-3 items-center'>
							{priority && <span className='text-sm font-bold'>{priority}</span>}
							{label && (
								<span className='text-sm font-bold inline-block pl-3 border-l border-solid border-main'>
									{taskService.displayLabel(label)}
								</span>
							)}
						</div>
					)}
				</div>
				<p className='leading-3 pl-1'>{description}</p>
				<div className='flex gap-x-1 items-center pl-1'>
					<img className='w-5 h-5 mt-0.5' src={displayImage(date)} />
					<div style={{ flex: '0 0 100%' }} className='flex justify-between items-center pr-6'>
						<span className='text-lg'>{displayDate(date, time)}</span>
						<div
							onClick={() => {
								taskService.hide(
									setTasksStructure,
									grouping,
									date,
									id,
									priority,
									label,
									section,
									setOnConfirm,
									setOnReject,
									setMessage,
									title
								);
							}}
							className='pr-1'
						>
							<img className='w-7 h-7' src='/img/main/incoming_tab/bin.svg' alt='Delete' />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
