import React, { useState } from 'react';
import customStyles from '../../styles/assets/registration.module.scss';
export function Input({
	title,
	maxLength,
	isPassword,
	required,
	onChange,
	styles,
	input,
	inputStyles,
	value,
}: {
	title: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	input?: React.MutableRefObject<HTMLInputElement | null>; //
	maxLength?: number;
	isPassword?: boolean;
	required?: boolean;
	styles?: string;
	inputStyles?: string;
	value?: string;
}) {
	const [passwordVisible, setPasswordVisible] = useState(false);
	return (
		<div className={`${customStyles.container} ${styles} `}>
			<input
				defaultValue={value}
				ref={input}
				placeholder=''
				autoFocus={false}
				onChange={e => onChange?.(e)}
				type={passwordVisible || !isPassword ? 'text' : 'password'}
				required={required}
				className={`${customStyles.input} ${inputStyles}`}
				maxLength={maxLength}
			/>
			<label className={customStyles.label}>{title}</label>
			{isPassword && (
				<div
					onClick={() => void setPasswordVisible(prev => !prev)}
					className='absolute top-0 right-2 w-6 h-6'
				>
					{passwordVisible ? (
						<img src='/img/registration/make_invisible.svg' />
					) : (
						<img className='' src='/img/registration/make_visible.svg' />
					)}
				</div>
			)}
		</div>
	);
}
