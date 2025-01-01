import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useImmer } from 'use-immer';
import { GROUPING } from '../constants/Grouping';
import { LOCAL_STORAGE } from '../constants/LocalStorage';
import { GroupingContext } from '../context/Grouping';
import { ModalContext } from '../context/Modal.context';
import { NotificationContext } from '../context/Notification.context';
import { ReRenderContext } from '../context/ReRender.context';
import { SectionsContext } from '../context/Sections.context';
import { authorizationService } from '../services/auth/Authorization.service';
import { incomingService } from '../services/incoming/Incoming.service';
import { Grouping } from '../types/Grouping.type';
import { TasksStructure } from '../types/TasksStructure.interface';
import { getTasks } from '../utils/getTasks';
import AddTask from './page/main/addTask/AddTask';
import Incoming from './page/main/incoming/content/Incoming';
import { Sidebar } from './page/sidebar/Sidebar';
import { Notification } from './ui/Notification';

export function Page() {
	//State
	const [sections, setSections] = useImmer<string[]>([]);

	const [update, setUpdate] = useState(''); //update component manually when tasks change
	const [tasksStructure, setTasksStructure] = useImmer<TasksStructure>({});
	const [message, setMessage] = useState('');
	const [onReject, setOnReject] = useState<(() => void) | null>(() => () => {});
	const [onConfirm, setOnConfirm] = useState(() => () => {});
	const [grouping, setGrouping] = useState<Grouping>(GROUPING.DEFAULT);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const handleBeforeUnload = () => {
			incomingService.sendToServer(tasksStructure, sections);
			if (
				localStorage[LOCAL_STORAGE.NO_REGISTRATION] ===
				LOCAL_STORAGE[LOCAL_STORAGE.NO_REGISTRATION]
			) {
				incomingService.saveToLocalStorage(tasksStructure, sections);
			}
		};
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [tasksStructure, sections]);

	useEffect(() => {
		authorizationService.autoLogIn(setTasksStructure, setSections);
	}, []);

	useEffect(() => {
		if (message !== '') {
			toast(t => (
				<Notification
					id={t.id}
					toast={t}
					toastObject={toast}
					message={message}
					onConfirm={onConfirm}
					onReject={onReject}
				/>
			));
		}
	}, [message, onReject, onConfirm]);
	return (
		<div className='flex w-full bg-black'>
			<ReRenderContext.Provider value={[update, setUpdate]}>
				<SectionsContext.Provider value={[sections, setSections]}>
					<NotificationContext.Provider value={{ setMessage, setOnConfirm, setOnReject }}>
						<GroupingContext.Provider value={[grouping, setGrouping]}>
							<ModalContext.Provider value={[open, setOpen]}>
								<AddTask
									tasksStructure={tasksStructure}
									setModalOpen={setOpen}
									sections={sections}
									grouping={grouping}
									setTasksStructure={setTasksStructure}
								/>
								<Sidebar />
								<Toaster
									position='bottom-left'
									toastOptions={{
										style: {
											background: '#0c0e0d',
											padding: '10px',
											borderRadius: '10px',
											width: 'auto',
										},
									}}
								/>
								<Incoming
									tasksStructure={tasksStructure}
									setTasksStructure={setTasksStructure}
									sections={sections}
									setSections={setSections}
								/>
							</ModalContext.Provider>
						</GroupingContext.Provider>
					</NotificationContext.Provider>
				</SectionsContext.Provider>
			</ReRenderContext.Provider>
		</div>
	);
}
