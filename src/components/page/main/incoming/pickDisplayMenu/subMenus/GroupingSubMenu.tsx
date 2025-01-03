import { motion } from 'framer-motion';
import { FILTERS } from '../../../../../../constants/Filters';
import { pickDisplayMenuService } from '../../../../../../services/pickDisplayMenu/pickDisplayMenu.service';
import { Filter } from '../../../../../../types/Filter.type';
import { Grouping } from '../../../../../../types/Grouping.type';

export function GroupingSubMenu({
	grouping,
	setGrouping,
	type,
}: {
	grouping: Grouping;
	setGrouping: React.Dispatch<React.SetStateAction<Grouping>>;
	type: Filter | undefined;
}) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: type === FILTERS.GROUPING ? 1 : 0 }}
			className={`${
				type === FILTERS.GROUPING ? 'pointer-events-auto' : 'pointer-events-none'
			} absolute left-0 top-full w-44 shadow-light rounded-classic bg-nav z-10`}
		>
			<div className='relative flex flex-col'>
				{pickDisplayMenuService.grouping.map((item, i) => {
					return (
						<div
							onClick={() => {
								setGrouping(item.title);
							}}
							className={`pt-1.5 ${i == 0 && 'rounded-t-classic'} ${
								i == pickDisplayMenuService.grouping.length - 1 && 'rounded-b-classic'
							} transition-colors duration-300 ${
								grouping === item.title && 'bg-hover'
							} hover:bg-hover pb-1.5 pl-2 pr-2 flex items-center gap-x-2`}
						>
							<img className='block w-4 h-4' src={item.img} alt='' />
							<span className='text-white'>{item.title}</span>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
}
