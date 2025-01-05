export const formatTasks = (tasks:any[]) => {
	return tasks.map((task: any) => {
		const copy = { ...task };
		delete copy.task_id;
		delete copy.user_id;
		if (!copy.label) copy.label = undefined;
		if (!copy.section) copy.section = undefined;
		if (!copy.time) copy.time = undefined;
		return copy;
	});
};
