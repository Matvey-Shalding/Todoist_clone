import { Dispatch, SetStateAction } from 'react';
import { Displays } from '../../../../../types/Displays.type';

export function DisplayMode({
	mode,
	isActive,
	setDisplay,
	setMenuOpen,
}: {
	mode: Displays;
	isActive: boolean;
	setMenuOpen: Dispatch<SetStateAction<boolean>>;
	setDisplay: React.Dispatch<React.SetStateAction<Displays>>;
}) {
	return (
		<div
			className={`cursor-pointer basis-1/3 flex flex-col items-center justify-center gap-y-1 rounded-classic z-[10] text-black relative ${
				isActive && 'bg-white'
			}`}
			onClick={() => {
				setMenuOpen(false);
				setDisplay(mode);
			}}
		>
			<img
				className='w-6 h-6'
				src={`/img/main/incoming_tab/displays/${
					isActive ? 'black' : 'white'
				}/${mode.toLocaleLowerCase()}.svg`}
				alt={`${mode} display`}
			/>
			<span className={`text-sm ${isActive ? 'text-black' : 'text-white'}`}>{mode}</span>
		</div>
	);
}
