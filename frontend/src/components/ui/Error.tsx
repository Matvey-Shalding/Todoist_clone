import { motion } from 'framer-motion';

export function Error({ message, styles }: { message: string; styles?: string }) {
	return (
		<motion.div
			transition={{ duration: 0.2 }}
			animate={{ height: message ? 'auto' : 0 }}
			initial={{ height: 0 }}
			className={`flex gap-x-[1px] ${styles}`}
		>
			<img
				className={`${message ? 'block' : 'hidden'} w-[15px] h-[15px] relative top-[3px]`}
				src='/img/modals/error.svg'
			/>
			<span className='text-sm text-red pl-0.5 mb-1 inline-block'>{message}</span>
		</motion.div>
	);
}
