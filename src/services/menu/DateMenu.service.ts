import { Dispatch, SetStateAction } from 'react';
import { Updater } from 'use-immer';
import { DATES } from '../../constants/Date';
import { FORMAT } from '../../constants/DateFormat';
import { TIMEREGEXP } from '../../constants/TimeRegExp';
import { Menu } from '../../types/Menu.type';
import { TaskInfo } from '../../types/TaskInfo.interface';
import { displayDate } from '../../utils/displayDate';

interface Preset {
	content: string;
	date: Date | undefined;
	img: string;
}

class DateMenu {
	private now: Date = new Date();
	presets: Preset[] = [
		{
			content: 'Tomorrow',
			img: '/img/modals/quick_settings/sun.svg',
			date: new Date(new Date().setDate(this.now.getDate() + 1)),
		},
		{
			content: 'On the weekends',
			img: '/img/modals/quick_settings/sofa.svg',
			date:
				this.now.getDay() >= 6
					? new Date(new Date().setDate(this.now.getDate() + 7 - (this.now.getDay() - 1)))
					: new Date(new Date().setDate(this.now.getDate() + 6 - this.now.getDay())),
		},
		{
			content: 'Next week',
			img: '/img/modals/quick_settings/next_week.svg',
			date: new Date(new Date().setDate(this.now.getDate() + 8 - this.now.getDay())),
		},
		{
			content: 'Without term',
			img: '/img/modals/quick_settings/no_term.svg',
			date: undefined,
		},
	];

	isDisabled(time: string, taskInfo: TaskInfo): boolean {
		if (!time.match(TIMEREGEXP)) return true;
		const date = displayDate(taskInfo.date);
		if (date.trim() === DATES.TODAY || date === DATES.NODATE || date === DATES.OUTDATED) {
			const [currentHours, currentMins] = [new Date().getHours(), new Date().getMinutes()];

			const [hours, mins] = time.split(':').map(i => Number(i));
			if (currentHours > hours) {
				return true;
			} else if (currentHours === hours) {
				if (currentMins >= mins) {
					return true;
				} else {
					return false;
				}
			} else return false;
		} else {
			return false;
		}
	}

	onPresetClick(
		setTaskInfo: Updater<TaskInfo>,
		preset: Preset,
		setSelected: Dispatch<SetStateAction<Date | undefined>>,
		setMenu: Dispatch<SetStateAction<Menu | undefined>>
	) {
		setTaskInfo(prev => {
			if (preset.date) {
				prev.date = FORMAT.format(preset.date);
			} else {
				prev.date = DATES.NODATE;
			}
		});
		setSelected(preset.date);
		setMenu(undefined);
	}

	onSelect(
		date: Date | undefined,
		setSelected: Dispatch<SetStateAction<Date | undefined>>,
		setTaskInfo: Updater<TaskInfo>,
		setMenu: Dispatch<SetStateAction<Menu | undefined>>
	) {
		if (date) {
			setSelected(date);
			setTaskInfo(prev => {
				prev.date = FORMAT.format(date);
			});
		}
		setMenu(undefined);
	}

	onCancel(
		setTaskInfo: Updater<TaskInfo>,
		setTime: Dispatch<SetStateAction<string>>,
		timeInput: React.MutableRefObject<HTMLInputElement | null>
	) {
		setTaskInfo(prev => {
			prev.time = undefined;
		});
		setTime('');
		if (timeInput.current) {
			timeInput.current.value = '';
		}
	}

	onConfirm(
		setTaskInfo: Updater<TaskInfo>,
		setTime: Dispatch<SetStateAction<string>>,
		timeInput: React.MutableRefObject<HTMLInputElement | null>,
		time: string,
		setMenu: Dispatch<SetStateAction<Menu | undefined>>,
		taskInfo: TaskInfo
	) {
		if (timeInput.current) {
			timeInput.current.value = '';
		}
		setTime('');
		setTaskInfo(prev => {
			prev.time = time;
		});
		setMenu(undefined);
		const date = displayDate(taskInfo.date);
		if (date === DATES.OUTDATED || date === DATES.NODATE) {
			setTaskInfo(prev => {
				prev.date = FORMAT.format(new Date());
			});
		}
	}
}

export const dateMenuService = new DateMenu();
