import { motion } from 'framer-motion';
import { FILTERS } from '../../../../../../constants/Filters';
import { pickDisplayMenuService } from '../../../../../../services/pickDisplayMenu/pickDisplayMenu.service';
import { Filter } from '../../../../../../types/Filter.type';
import { Sorting } from '../../../../../../types/Sorting.type';

export function SortingSubMenu({
	setSorting,
	isCalendar,
	type,
}: {
	type: Filter | undefined;
	setSorting: React.Dispatch<React.SetStateAction<Sorting>>;
	isCalendar?: boolean;
}) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: type === FILTERS.SORTING ? 1 : 0 }}
			className={`absolute ${
				type === FILTERS.SORTING ? 'pointer-events-auto' : 'pointer-events-none'
			} left-0 shadow-light top-full flex flex-col w-44 rounded-classic bg-nav z-10 `}
		>
			{pickDisplayMenuService.sorting.map((item, i) => {
				return (
					<div
						onClick={() => void setSorting(item.title)}
						className={`pt-1.5 ${i === 0 && 'rounded-t-classic'} ${
							i == pickDisplayMenuService.sorting.length && 'rounded-b-classic'
						} hover:bg-hover flex items-center gap-x-2 transition-colors duration-300 pb-1.5 pl-2 pr-2 text-sm text-text`}
					>
						<img className='block w-4 h-4' src={item.img} alt='' />
						<span className='text-white'>{item.title}</span>
					</div>
				);
			})}
		</motion.div>
	);
}
