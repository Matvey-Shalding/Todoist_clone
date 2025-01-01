import { Dispatch, SetStateAction, useContext } from 'react';
import { Height } from 'react-animate-height';
import { Updater } from 'use-immer';
import { SECTION } from '../../../../../constants/Section';
import {
	NotificationContext,
	NotificationContextType,
} from '../../../../../context/Notification.context';
import { sectionService } from '../../../../../services/section/Section.service';
import { SETTINGS } from '../../../../../settings/Settings';
import { Section } from '../../../../../types/Section.type';
import { TasksStructure } from '../../../../../types/TasksStructure.interface';
import { Input } from '../../../../ui/Input';
import Modal from './DeleteSectionMenu';
export function Title({
	editable,
	setHeight,
	height,
	title,
	isEdit,
	inputTitle,
	setSections,
	setTasksStructure,
	setIsEdit,
	type,
	setVisible,
	visible,
	isEmpty,
	isCalendar,
}: {
	isCalendar?: boolean;
	editable: boolean;
	setHeight: React.Dispatch<React.SetStateAction<Height>>;
	height: Height;
	title: string;
	isEdit: boolean;
	inputTitle: React.MutableRefObject<HTMLInputElement | null>;
	setSections: Updater<string[]>;
	setTasksStructure: Updater<TasksStructure>;
	setIsEdit: Dispatch<SetStateAction<boolean>>;
	type: Section;
	setVisible: Dispatch<SetStateAction<boolean>>;
	visible: boolean;
	isEmpty: boolean;
}) {
	//Context

	const { setMessage, setOnConfirm, setOnReject } = useContext(
		NotificationContext
	) as NotificationContextType;

	if (!editable) {
		return (
			<div className={`pb-1 border-b border-solid border-main`}>
				<div
					onClick={() => {
						!isEmpty && !isCalendar && setHeight(prev => (prev === 0 ? 'auto' : 0));
					}}
					className='flex items-center gap-x-2'
				>
					<div
						className={`transition-transform ${
							height !== 0 ? '' : '-rotate-90 transition-transform'
						}`}
					>
						{!isEmpty && !isCalendar && (
							<img
								className='w-3 h-3'
								src='/img/navigation/menu-arrow-white.svg'
								alt='arrow'
							/>
						)}
					</div>
					<span className='font-bold text-lg'>{title}</span>
				</div>
			</div>
		);
	} else {
		if (isEdit) {
			return (
				<div
					className={`flex border-b border-solid border-main items-center gap-x-1 pb-0.5 ${
						type === SECTION.SMALL && 'w-[340px]'
					} `}
				>
					<Input
						value={title}
						maxLength={SETTINGS.SECTION}
						inputStyles='border-none'
						input={inputTitle}
						title='Section title'
					/>
					<div className='flex items-center gap-x-1.5'>
						<div
							onClick={() =>
								sectionService.changeTitle(
									setMessage,
									setOnConfirm,
									setOnReject,
									setSections,
									title,
									setTasksStructure,
									inputTitle,
									setIsEdit
								)
							}
						>
							<img className='w-6 h-6' src='/img/main/yes.svg' alt='' />
						</div>
						<div
							onClick={() => {
								if (inputTitle.current) {
									inputTitle.current.value = '';
								}
								setIsEdit(false);
							}}
						>
							<img className='w-[16px] h-[16px]' src='/img/main/no.svg' alt='' />
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div
					onDoubleClick={() => void setIsEdit(true)}
					style={{ width: type === 'Small' ? '340px' : undefined }}
					className='flex justify-between items-center pr-1 pb-1 border-b border-solid border-main'
				>
					<div
						onClick={() => {
							!isEmpty && !isCalendar && setHeight(prev => (prev === 0 ? 'auto' : 0));
						}}
						className={`${!isEmpty && 'flex items-center gap-x-2'}`}
					>
						<div
							className={`transition-transform ${
								height !== 0 ? '' : '-rotate-90 transition-transform'
							}`}
						>
							{!isEmpty && !isCalendar && (
								<img
									className='w-3 h-3'
									src='/img/navigation/menu-arrow-white.svg'
									alt='arrow'
								/>
							)}
						</div>
						<span className='font-bold text-lg'>{title}</span>
					</div>
					<div className='flex gap-x-2 items-center self-end'>
						<div onClick={() => void setIsEdit(true)}>
							<img className='w-[24px] h-[26px]' src='/img/navigation/edit.svg' alt='' />
						</div>
						<div>
							<Modal
								setModalOpen={setVisible}
								open={visible}
								setOpen={setVisible}
								title={title}
								setSections={setSections}
								setTasksStructure={setTasksStructure}
							/>
							<div onClick={() => void setVisible(true)}>
								<img
									className='w-[24px] h-[24px]'
									src='/img/main/incoming_tab/bin.svg'
									alt=''
								/>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
