import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { pageConfig } from '../../../config/pages.config';
import { LOCAL_STORAGE } from '../../../constants/LocalStorage';

export function RegistrationMenu({ open }: { open: boolean }) {
	const isLogged = useMemo(() => {
		return localStorage[LOCAL_STORAGE.IS_SING_UP] === LOCAL_STORAGE.IS_LOGGED;
	}, []);
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0 }}
			className={`flex flex-col gap-y-1.5 w-40 top-full absolute bg-zinc-900 rounded-classic shadow-tiny pl-0 pr-0 p-2`}
		>
			<span className='font-medium pl-2 text-lg border-b border-solid border-main pb-1'>
				Registration:
			</span>
			{isLogged ? (
				<React.Fragment>
					<Link
						onClick={() => localStorage.clear()}
						to={pageConfig.singUp}
						className='flex pl-2 gap-x-1 items-center'
					>
						<img
							className='block w-[18px] h-[18px]'
							src='/img/navigation/registration/log_out.svg'
							alt=''
						/>
						<span>Log out</span>
					</Link>
				</React.Fragment>
			) : (
				<React.Fragment>
					<Link
						onClick={() => localStorage.clear()}
						to={pageConfig.logIn}
						className='flex pl-2 gap-x-1 items-center'
					>
						<img
							className='block w-[18px] h-[18px]'
							src='/img/navigation/registration/log_in.svg'
							alt=''
						/>
						<span>Log in</span>
					</Link>
					<Link
						onClick={() => localStorage.clear()}
						to={pageConfig.singUp}
						className='flex pl-2 gap-x-1'
					>
						<img
							className='block w-[18px] h-[18px]'
							src='/img/navigation/registration/log_in.svg'
							alt=''
						/>
						<span>Sing up</span>
					</Link>
				</React.Fragment>
			)}
		</motion.div>
	);
}
