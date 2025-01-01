import { useEffect, useState } from 'react';
import { Toast } from 'react-hot-toast';

export function Notification({
	message,
	toast,
	toastObject,
	onConfirm,
	onReject,
	id,
}: {
	toastObject: any;
	toast: Toast;
	message: string;
	onReject: (() => void) | null;
	onConfirm: () => void;
		id: string;
	}) {
	const [dismissed,setDismissed] = useState(false)
	useEffect(() => {
		if (!dismissed && !toast.visible) {
			onConfirm()
		}
	},[toast.visible,dismissed])
	return (
		<div className='flex gap-x-3.5 items-center'>
			<span className='text-white'>{message}</span>
			{onReject && (
				<span
					onClick={() => {
						onReject?.();
						setDismissed(true)
						toastObject.dismiss(id);
						toast.visible = false;
					}}
					className='text-red'
				>
					Reject
				</span>
			)}
			<div
				onClick={() => {
					setDismissed(true)
					toastObject.dismiss(id);
					onConfirm();
				}}
			>
				<img className='w-3.5 h-3.5 block' src='/img/main/no.svg' alt='' />
			</div>
		</div>
	);
}
