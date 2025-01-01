import { motion } from 'framer-motion';
import { FILTERS } from '../../../../../../constants/Filters';
import { ORDEROFSORTING } from '../../../../../../constants/OrderOfSorting';
import { Filter } from '../../../../../../types/Filter.type';
import { OrderOfSorting } from '../../../../../../types/OrderOfSorting.type';
import { pickDisplayMenuService } from '../../../../../../services/pickDisplayMenu/pickDisplayMenu.service';

export function OrderSubMenu({
	order,
	setOrder,
	type,
}: {
	order:OrderOfSorting
	setOrder: React.Dispatch<React.SetStateAction<OrderOfSorting>>;
	type: Filter | undefined;
}) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: type === FILTERS.ORDER ? 1 : 0 }}
			className={`absolute shadow-light left-0 top-full flex flex-col w-44 rounded-classic bg-nav z-10 ${
				type === FILTERS.ORDER ? 'pointer-events-auto' : 'pointer-events-none'
			}`}
		>
			{pickDisplayMenuService.order.map((item, i) => {
				return (
					<div
						onClick={() => void setOrder(item.title)}
						className={`pt-1.5 ${i === 0 && 'rounded-t-classic'} ${
							i == pickDisplayMenuService.sorting.length && 'rounded-b-classic'
						} transition-colors duration-300  ${
							item.title === order && 'bg-hover'
						} hover:bg-hover flex items-center pb-3.5 pl-2 pr-2 text-sm text-text`}
					>
						<div className='flex gap-x-2 pt-1 items-center'>
							<img className='block w-4 h-4' src={item.img} alt='' />
							<span className='text-white'>{item.title}</span>
						</div>
					</div>
				);
			})}
		</motion.div>
	);
}
