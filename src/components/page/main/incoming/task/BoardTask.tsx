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
export function BoardTask({
	edit,
	label,
	priority,
	checkbox,
	title,
	description,
	setTasksStructure,
	id,
	section,
	date,
	createdAt,
	setEdit,
	isClone,
	time,
	tasksStructure,
}: TaskProps) {
	//Context

	const [grouping] = useContext(GroupingContext) as GroupingContextType;
	const { setMessage, setOnConfirm, setOnReject } = useContext(
		NotificationContext
	) as unknown as NotificationContextType;

	//UseMemo

	const defaultTaskInfo: TaskInfo = useMemo(() => {
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

	const [taskInfo, setTaskInfo] = useImmer<TaskInfo>(defaultTaskInfo);

	if (edit) {
		return (
			<EditBoardTask
				tasksStructure={tasksStructure}
				date={date}
				label={label}
				priority={priority}
				setTaskInfo={setTaskInfo}
				taskInfo={taskInfo}
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
			<div
				className={`w-[320px] ${
					isClone && 'bg-main'
				} shadow-task flex flex-col gap-y-2 pt-2 pb-2 pr-2.5 pl-2.5 border border-solid border-main rounded-classic`}
			>
				<div className='flex justify-between pl-1'>
					<div className={`${(label || priority) && 'flex justify-between items-center'}`}>
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
					>
						<img className='w-7 h-7' src='/img/main/incoming_tab/bin.svg' alt='Delete' />
					</div>
				</div>
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
				<p className='leading-3 pl-1'>{description}</p>
				<div className='flex gap-x-1 items-center pl-1'>
					<img className='w-5 h-5 mt-0.5' src={displayImage(date)} />
					<div className='flex basis-full flex-wrap justify-between items-center pr-6'>
						<span>{displayDate(date, time, true)}</span>
					</div>
				</div>
			</div>
		);
	}
}
