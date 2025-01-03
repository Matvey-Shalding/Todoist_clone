import { GROUPING } from '../../constants/Grouping';
import { ORDEROFSORTING } from '../../constants/OrderOfSorting';
import { SORTING } from '../../constants/Sorting';
import { Grouping } from '../../types/Grouping.type';
import { OrderOfSorting } from '../../types/OrderOfSorting.type';
import { Sorting } from '../../types/Sorting.type';

interface GroupingItem {
	title: Grouping;
	img: string;
}

interface SortingItem {
	title: Sorting;
	img: string;
}

interface OrderItem {
	title: OrderOfSorting;
	img: string;
}

class PickMenu {
	readonly grouping: GroupingItem[] = [
		{
			title: GROUPING.DEFAULT,
			img: '/img/pickDisplayMenu/grouping/default.svg',
		},
		{
			title: GROUPING.PRIORITY,
			img: '/img/pickDisplayMenu/grouping/priority.svg',
		},
		{
			title: GROUPING.DATE,
			img: '/img/pickDisplayMenu/grouping/date.svg',
		},
		{
			title: GROUPING.LABEL,
			img: '/img/pickDisplayMenu/grouping/label.svg',
		},
	];

	readonly sorting: SortingItem[] = [
		{
			title: SORTING.NO,
			img: '/img/pickDisplayMenu/sorting/no.svg',
		},
		{
			title: SORTING.DEFAULT,
			img: '/img/pickDisplayMenu/sorting/manual.svg',
		},
		{
			title: SORTING.DATEADDED,
			img: '/img/pickDisplayMenu/sorting/dateAdded.svg',
		},

		{
			title: SORTING.PRIORITY,
			img: '/img/pickDisplayMenu/sorting/priority.svg',
		},

		{
			title: SORTING.TARGETDATE,
			img: '/img/pickDisplayMenu/sorting/targetDate.svg',
		},

		{
			title: SORTING.TITLE,
			img: '/img/pickDisplayMenu/sorting/title.svg',
		},
	];

	readonly order: OrderItem[] = [
		{
			title: ORDEROFSORTING.ASCENDING,
			img: '/img/pickDisplayMenu/order/ascending.svg',
		},
		{
			title: ORDEROFSORTING.DESCENDING,
			img: '/img/pickDisplayMenu/order/descending.svg',
		},
	];
}

export const pickDisplayMenuService = new PickMenu()
