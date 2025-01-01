import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pageConfig } from '../../config/pages.config';
import { authorizationService } from '../../services/auth/Authorization.service';
import { getUserNames } from '../../utils/getUserNames';
import { Checkbox } from '../ui/Checkbox';
import { Error } from '../ui/Error';
import { Input } from '../ui/Input';

export function SingUp() {
	//State

	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [userNames, setUserNames] = useState<string[]>([]);
	const navigate = useNavigate();
	const [checked, setChecked] = useState(true);

	useEffect(() => {
		getUserNames().then(data => void setUserNames(data));
	}, []);

	useEffect(() => {
		if (userNames.includes(userName)) {
			setError('This user already exists');
		} else {
			setError('');
		}
	}, [userName]);

	return (
		<div className='w-screen h-screen bg-main grid place-content-center'>
			<div className='w-[500px] p-5 flex flex-col bg-nav shadow-small rounded-classic'>
				<div className='flex flex-col justify-center items-center mb-6'>
					<span className='text-2xl text-white font-bold'>Create an account</span>
					<span className='text-lg text-white/50 font-medium'>
						Please, enter your information
					</span>
				</div>
				<div className='flex basis-full w-full flex-col gap-y-10 items-center mb-3'>
					<Input title='Username' maxLength={25} onChange={e => setUserName(e.target.value)} />
					<Error styles='-mt-9 self-start' message={error} />
					<Input
						onChange={e => setPassword(e.target.value)}
						required
						isPassword
						maxLength={25}
						title='Password'
					/>
				</div>
				<div className='mb-2.5'>
					<label className='flex items-center gap-x-1'>
						<Checkbox checked onChange={e => void setChecked(e.target.checked)} />
						<span className='text-lg text-white font-medium'>Remember me</span>
					</label>
				</div>
				<button
					onClick={() => void authorizationService.singUp(userName, password, navigate,checked)}
					disabled={!(userName && password && !error)}
					className='w-full opacity-100 duration-500 transition-opacity disabled:opacity-75 disabled:cursor-not-allowed min-h-[40px] rounded-classic bg-blue text-xl font-bold mb-3'
				>
					Sing up
				</button>
				<div className='flex flex-col w-full items-center justify-center'>
					<span className='font-medium text-white'>Already have an account?</span>
					<Link to={pageConfig.logIn}>
						<span className='text-blue font-bold text-sm'>Log in to your Account</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
