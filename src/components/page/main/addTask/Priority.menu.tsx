import { motion } from 'framer-motion';
import { Updater } from 'use-immer';
import { PRIORITIES } from '../../../../constants/Priority';
import { Menu } from '../../../../types/Menu.type';
import { TaskInfo } from '../../../../types/TaskInfo.interface';
import { capitalizeFirstLetter } from '../../../../utils/capitalizeFirstLetter';
import { unCapitalizeFirstLetter } from '../../../../utils/unCapitalizeFirstLetter';
export function PriorityMenu({
	hidden,
	setTaskInfo,
	setMenu,
	taskInfo,
}: {
	taskInfo: TaskInfo;
	hidden: boolean;
	setTaskInfo: Updater<TaskInfo>;
	setMenu: React.Dispatch<React.SetStateAction<Menu | undefined>>;
}) {
	return (
		<motion.div
			data-id='priority'
			initial={{
				height: 0,
			}}
			animate={{
				height: hidden ? 0 : 'auto',
			}}
			className={`rounded-classic text-xl absolute z-[100000000] translate-y-2 w-40 bg-nav shadow-light ${
				hidden ? 'pointer-events-none' : 'pointer-events-auto'
			}`}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{
					opacity: hidden ? 0 : 1,
					transition: {
						opacity: {
							delay: 0.15,
							duration: 0.1,
						},
					},
				}}
				exit={{
					opacity: hidden ? 0 : 1,
					transition: {
						duration: 3,
					},
				}}
				className='flex flex-col'
			>
				{Object.values(PRIORITIES).map(item => {
					let style;
					if (item === PRIORITIES.DEFAULT) {
						style = { borderTopLeftRadius: '10px', borderTopRightRadius: '10px' };
					} else if (item === PRIORITIES.HIGH) {
						style = { borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' };
					}
					return (
						<div
							onClick={() => {
								setTaskInfo(prev => {
									prev.priority = item;
								});
								setMenu(undefined);
							}}
							style={style}
							className={`flex transition-colors duration-300 hover:bg-hover active:relative active:top-[0.5px] border-b border-solid border-main gap-x-1 pt-3 pb-3 pl-2 pr-5 items-end ${
								taskInfo.priority === item && 'bg-hover'
							}`}
						>
							<img
								className='inline-block w-5 h-5'
								src={`/img/modals/priority/${item}.svg`}
								alt={item + ' priority'}
							/>
							<span className='text-sm'>{item}</span>
						</div>
					);
				})}
			</motion.div>
		</motion.div>
	);
}
