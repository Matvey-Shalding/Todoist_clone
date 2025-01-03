import { AnimationScope } from 'framer-motion';

interface Item {
	id: number;
	content: string;
	path: string;
	clickable?: boolean;
}

class Sidebar {
	readonly animation = {
		width: {
			duration: 0.4,
		},
		opacity: {
			duration: 0.1,
		},
	};

	readonly items: Item[] = [
		{
			content: 'Add task',
			id: 1,
			path: '/img/navigation/menuitems/add.svg',
			clickable: true,
		},
		{
			content: 'Search',
			id: 2,
			path: '/img/navigation/menuitems/search.svg',
		},
		{
			content: 'Incoming messages',
			id: 3,
			path: '/img/navigation/menuitems/mail.svg',
		},
		{
			content: 'Today',
			id: 4,
			path: '/img/navigation/menuitems/today.svg',
		},
		{
			content: 'Filters and labels',
			id: 5,
			path: '/img/navigation/menuitems/labels.svg',
		},
	];

	async closeSidebar(
		animateSidebar: any,
		sidebar: AnimationScope<any>,
		animateClosedSidebar: any,
		closedSidebar: AnimationScope<any>
	) {
		await animateSidebar(
			sidebar.current,
			{
				width: 0,
				opacity: 0,
				paddingLeft: 0,
				paddingRight: 0,
			},
			this.animation
		);
		await animateClosedSidebar(closedSidebar.current, { width: 32 });
	}

	async openSidebar(
		animateSidebar: any,
		sidebar: AnimationScope<any>,
		animateClosedSidebar: any,
		closedSidebar: AnimationScope<any>
	) {
		await animateClosedSidebar(closedSidebar.current, { width: 0 }, { duration: 0.2 });
		await animateSidebar(sidebar.current, { width: 280, opacity: 1 }, this.animation);
	}
}

export const sidebarService = new Sidebar();
