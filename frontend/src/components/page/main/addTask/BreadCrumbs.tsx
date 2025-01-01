import { Dispatch, SetStateAction } from 'react';
import { Height } from 'react-animate-height';
import { Updater } from 'use-immer';
import { MENUS } from '../../../../constants/Menus';
import { Menu } from '../../../../types/Menu.type';
import { TaskInfo } from '../../../../types/TaskInfo.interface';
import { displayDate } from '../../../../utils/displayDate';
import { displayImage } from '../../../../utils/displayImage';
import { Breadcrumb } from '../../../ui/Breadcrumb';
import { DateMenu } from './Date.menu';
import { PriorityMenu } from './Priority.menu';
import { SectionMenu } from './SectionMenu';

export function BreadCrumbs({
	setMenu,
	menu,
	setTaskInfo,
	setHeight,
	inline,
	defaultDateValue,
	taskInfo,
	sections,
}: {
	setMenu: Dispatch<SetStateAction<Menu | undefined>>;
	menu: Menu | undefined;
	setTaskInfo: Updater<TaskInfo>;
	taskInfo: TaskInfo;
	setHeight: Dispatch<SetStateAction<Height>>;
	sections: string[];
	inline?: boolean;
	defaultDateValue?: string;
}) {
	return (
		<div className='flex gap-x-2 gap-y-2 flex-wrap'>
			<div className={`${!inline && 'relative'}`}>
				<Breadcrumb
					active={menu === MENUS.DATE}
					onClick={e => {
						setMenu(prev => (prev === 'date' ? undefined : 'date'));
					}}
					content={displayDate(taskInfo.date, taskInfo.time,true)}
					path={displayImage(displayDate(taskInfo.date, taskInfo.time))}
				/>
				{inline ? (
					<div
						className={`fixed z-[1000000] top-[12%] ${
							menu === 'date' && 'pb-[7px]'
						} rounded-classic`}
					>
						<DateMenu
							taskInfo={taskInfo}
							date={defaultDateValue ? new Date(defaultDateValue) : undefined}
							setTaskInfo={setTaskInfo}
							inline
							open={menu === 'date'}
							setMenu={setMenu}
						/>
					</div>
				) : (
					<DateMenu
						taskInfo={taskInfo}
						date={defaultDateValue ? new Date(defaultDateValue) : undefined}
						setTaskInfo={setTaskInfo}
						setMenu={setMenu}
						open={menu === 'date'}
					/>
				)}
			</div>
			<div className={`${!inline && 'relative'}`}>
				<Breadcrumb
					active={menu === MENUS.PRIORITY}
					onClick={e => {
						setMenu(prev => (prev === MENUS.PRIORITY ? undefined : MENUS.PRIORITY));
					}}
					content={taskInfo.priority}
					path={`/img/modals/priority/${taskInfo.priority}.svg`}
				/>
				{inline ? (
					<div
						className={`fixed z-[1000000] ${
							menu === MENUS.PRIORITY && 'pb-[7px]'
						} rounded-classic`}
					>
						<PriorityMenu
							taskInfo={taskInfo}
							setMenu={setMenu}
							setTaskInfo={setTaskInfo}
							hidden={!(menu === MENUS.PRIORITY)}
						/>
					</div>
				) : (
					<PriorityMenu
						taskInfo={taskInfo}
						setMenu={setMenu}
						setTaskInfo={setTaskInfo}
						hidden={!(menu === MENUS.PRIORITY)}
					/>
				)}
			</div>
			<Breadcrumb
				active={menu === MENUS.LABEL}
				onClick={e => {
					setMenu(prev => {
						return prev === MENUS.LABEL ? undefined : MENUS.LABEL;
					});
					setHeight(p => {
						return menu !== MENUS.LABEL ? 'auto' : 0;
					});
				}}
				content={taskInfo.label ? taskInfo.label : MENUS.LABEL}
				path='/img/modals/label.svg'
			/>
			{sections.length > 0 && (
				<div className={`${!inline && 'relative'}`}>
					<Breadcrumb
						active={menu === MENUS.SECTION}
						onClick={e => {
							setMenu(prev => (prev === MENUS.SECTION ? undefined : MENUS.SECTION));
						}}
						content={taskInfo.section ? taskInfo.section : 'Section'}
						path={`/img/modals/section.svg`}
					/>
					{inline ? (
						<div
							className={`fixed z-[1000000] ${
								menu === MENUS.SECTION && 'pb-[7px]'
							} rounded-classic`}
						>
							<SectionMenu
								sections={sections}
								open={menu === MENUS.SECTION}
								setMenu={setMenu}
								setTaskInfo={setTaskInfo}
							/>
						</div>
					) : (
						<SectionMenu
							sections={sections}
							open={menu === MENUS.SECTION}
							setMenu={setMenu}
							setTaskInfo={setTaskInfo}
						/>
					)}
				</div>
			)}
		</div>
	);
}
