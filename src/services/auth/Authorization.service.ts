import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Updater } from 'use-immer';
import { pageConfig } from '../../config/pages.config';
import { LOCAL_STORAGE } from '../../constants/LocalStorage';
import { MESSAGES } from '../../constants/Messages';
import { REQUEST_PURPOSES } from '../../constants/RequestPurposes';
import { TASK } from '../../constants/Task';
import { Task } from '../../types/Task.type';
import { TasksStructure } from '../../types/TasksStructure.interface';
import { markOutdatedDates } from '../../utils/markOutDatedTasks';

class Authorization {
	async singUp(
		username: string,
		password: string,
		navigate: NavigateFunction,
		checked: boolean
	) {
		const response = await axios.post(pageConfig.storage, {
			username,
			password,
			purpose: REQUEST_PURPOSES.SING_UP,
		});
		if (response.status === 200) {
			navigate(pageConfig.main);
		}
		localStorage[LOCAL_STORAGE.USERNAME] = username;
		if (checked) {
			localStorage[LOCAL_STORAGE.IS_SING_UP] = LOCAL_STORAGE.IS_LOGGED;
		}
	}

	async autoLogIn(setTasksStructure: Updater<TasksStructure>, setSections: Updater<string[]>) {
		if (localStorage[LOCAL_STORAGE.IS_SING_UP] === LOCAL_STORAGE.IS_LOGGED) {
			const username = localStorage[LOCAL_STORAGE.USERNAME];
			const response = await axios.post(pageConfig.storage, {
				username,
				purpose: REQUEST_PURPOSES.AUTO_LOG_IN,
			});

			if (Array.isArray(response.data.sections)) {
				setSections(response.data.sections);
			}
			if (Array.isArray(response.data.tasks)) {
				setTasksStructure(prev => {
					prev[TASK.NOSECTION] = markOutdatedDates(response.data.tasks);
				});
			}
		} else if (localStorage[LOCAL_STORAGE.NO_REGISTRATION] === LOCAL_STORAGE.NO_REGISTRATION) {
			if (localStorage[LOCAL_STORAGE.TASKS]) {
				const tasks = JSON.parse(localStorage[LOCAL_STORAGE.TASKS]);
				const parsed = tasks.map((t: any) => JSON.parse(t)) as Task[];
				setTasksStructure(prev => {
					prev[TASK.NOSECTION] = markOutdatedDates(parsed);
				});
			} else {
				localStorage[LOCAL_STORAGE.TASKS] = JSON.stringify([]);
			}
			if (localStorage[LOCAL_STORAGE.SECTIONS]) {
				const sections = JSON.parse(localStorage[LOCAL_STORAGE.SECTIONS]) as string[];
				setSections(sections);
			} else {
				localStorage[LOCAL_STORAGE.SECTIONS] = JSON.stringify([]);
			}
		}
	}

	async logIn(
		username: string,
		password: string,
		setError: Dispatch<SetStateAction<string>>,
		navigate: NavigateFunction,
		checked: boolean
	) {
		const response = await axios.post(pageConfig.storage, {
			username,
			password,
			purpose: REQUEST_PURPOSES.LOG_IN,
		});
		if (response.data === MESSAGES.NO_USER_FOUND) {
			setError(MESSAGES.NO_USER_FOUND);
		} else if (response.data === MESSAGES.WRONG_PASSWORD) {
			setError(MESSAGES.WRONG_PASSWORD);
		} else if ('tasks' in response.data && 'sections' in response.data) {
			const { tasks, sections } = response.data;
			console.log(tasks, sections);
			localStorage[LOCAL_STORAGE.USERNAME] = username;
			if (checked) {
				localStorage[LOCAL_STORAGE.IS_SING_UP] = LOCAL_STORAGE.IS_LOGGED;
			}
			navigate(pageConfig.main);
		}
	}

	continueWithoutRegistration() {
		localStorage[LOCAL_STORAGE.IS_SING_UP] = LOCAL_STORAGE.IS_NOT_LOGGED;
		localStorage[LOCAL_STORAGE.NO_REGISTRATION] = LOCAL_STORAGE.NO_REGISTRATION;
	}
}

export const authorizationService = new Authorization();
