import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAnimate } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { LOCAL_STORAGE } from '../../../constants/LocalStorage';
import { ModalContext, ModalContextType } from '../../../context/Modal.context';
import { sidebarService } from '../../../services/sidebar/Sidebar.service';
import { RegistrationMenu } from './RegistrationMenu';

export function Sidebar() {
	//Context

	const [, setModalOpen] = useContext(ModalContext) as ModalContextType;

	//State and refs

	const [hidden, setHidden] = useState<boolean | 'initial'>('initial');
	const [sidebar, animateSidebar] = useAnimate();
	const [closedSidebar, animateClosedSidebar] = useAnimate();
	const [open, setOpen] = useState(false);

	//UseEffects

	// Animating appearance of sidebar

	useEffect(() => {
		AOS.init({});
	}, []);

	useEffect(() => {
		if (hidden === true) {
			sidebarService.closeSidebar(
				animateSidebar,
				sidebar,
				animateClosedSidebar,
				closedSidebar
			);
		} else if (!hidden) {
			sidebarService.openSidebar(animateSidebar, sidebar, animateClosedSidebar, closedSidebar);
		}
	}, [hidden]);

	return (
		<div className='flex relative z-[0]' data-aos-duration='300' data-aos='slide-right'>
			<div className='w-[280px] pt-8 bg-zinc-900' ref={sidebar}>
				<div className='min-h-screen'>
					<div className='flex flex-col'>
						<div className='pl-4 pr-5'>
							<div className='pb-2 flex justify-between items-center mb-1.5 border-b border-solid'>
								<div
									onClick={() => void setOpen(prev => !prev)}
									className='relative flex items-center'
								>
									<img
										className='w-7 h-7 -ml-[3.5px] mr-1.5'
										src='/img/navigation/avatar.svg'
										alt='user'
									/>
									<span className='font-bold text-text text-lg'>
										{localStorage[LOCAL_STORAGE.USERNAME]
											? localStorage[LOCAL_STORAGE.USERNAME]
											: 'user'}
									</span>
									<img
										className='w-3 h-3 ml-2'
										src='/img/navigation/menu-arrow-white.svg'
										alt='arrow'
									/>
									<RegistrationMenu open={open} />
								</div>
								<div onClick={() => void setHidden(true)}>
									<img
										className='basis-[27px] h-[23px]'
										src='/img/navigation/sidebar.svg'
										alt='sidebar'
									/>
								</div>
							</div>
						</div>
						<div className='flex flex-col'>
							{sidebarService.items.map((item, index) => {
								return (
									<div
										onClick={() => {
											item.clickable && setModalOpen(true);
										}}
										className={`flex transition-colors duration-300 hover:bg-hover pr-4 pl-5 items-center gap-x-2.5 pt-1.5 pb-1.5`}
									>
										<img className='w-5 h-5 block' src={item.path} alt={item.content} />
										<span className='text-lg font-medium'>{item.content}</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div>
				<div
					ref={closedSidebar}
					className='min-h-screen relative pt-8 z-[2] pl-1.5 w-0 bg-main'
				>
					<img
						onClick={() => void setHidden(false)}
						className='basis-[27px] h-[23px] active:relative active:top-[1px]'
						src='/img/navigation/sidebar.svg'
						alt='sidebar'
					/>
				</div>
			</div>
		</div>
	);
}
