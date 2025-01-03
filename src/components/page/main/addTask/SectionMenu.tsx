import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Updater } from 'use-immer';
import { sectionMenuService } from '../../../../services/menu/SectionMenu.service';
import { Menu } from '../../../../types/Menu.type';
import { TaskInfo } from '../../../../types/TaskInfo.interface';
import { Input } from '../../../ui/Input';
export function SectionMenu({
	open,
	setTaskInfo,
	sections,
	inline,
	setMenu,
}: {
	setMenu: Dispatch<SetStateAction<Menu | undefined>>;
	open: boolean;
	setTaskInfo: Updater<TaskInfo>;
	sections: string[];
	inline?: boolean;
}) {
	//State

	const [searchedSection, setSearchedSection] = useState('');
	const [filteredSections, setFilteredSections] = useState(sections);

	useEffect(() => {
		setFilteredSections(sections);
	}, [sections]);

	return (
		<motion.div
			data-id='section'
			initial={{
				height: 0,
				padding: 0,
			}}
			animate={{
				height: open ? 'auto' : 0,
				paddingTop: open ? 8 : 0,
				paddingBottom: open ? 8 : 0,
			}}
			className={`${!inline && 'absolute'} top-full translate-y-2 ${
				open ? 'pointer-events-auto' : 'pointer-events-none'
			} -left-[72%] top-6 w-64 bg-main z-[1000000] shadow-tiny rounded-classic pt-2 pb-2`}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{
					opacity: open ? 1 : 0,
					transition: {
						opacity: {
							duration: 0.3,
						},
					},
				}}
				exit={{
					opacity: open ? 1 : 0,
				}}
				className='flex flex-col gap-y-1'
			>
				<div className='pl-2 pr-2'>
					<Input
						onChange={e => {
							sectionMenuService.searchSection(
								e,
								setSearchedSection,
								setFilteredSections,
								sections
							);
						}}
						title='Section title'
					/>
				</div>
				<div className='flex gap-x-1 items-center'>
					<span className='text-lg font-medium pl-3 text-text'>Sections:</span>
				</div>
				<div className='flex flex-col gap-y-1.5'>
					{filteredSections.map((sectionTitle: string) => {
						return (
							<div
								onClick={() => {
									setTaskInfo(prev => {
										prev.section = sectionTitle;
									});
									setMenu(undefined);
								}}
								className='gap-x-2.5 flex items-center pl-6'
							>
								<img className='w-4 h-4' src='/img/main/incoming_tab/add_section.svg' alt='' />
								<span>{sectionTitle}</span>
							</div>
						);
					})}
				</div>
			</motion.div>
		</motion.div>
	);
}
