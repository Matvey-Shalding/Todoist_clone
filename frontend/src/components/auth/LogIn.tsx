import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pageConfig } from '../../config/pages.config';
import { MESSAGES } from '../../constants/Messages';
import { authorizationService } from '../../services/auth/Authorization.service';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Error } from '../ui/Error';
import { Input } from '../ui/Input';
export function LogIn() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [checked, setChecked] = useState(true);
	const navigate = useNavigate();

	return (
		<div className='w-screen h-screen bg-main grid place-content-center'>
			<div className='w-[500px] p-5 pt-7 flex flex-col bg-nav shadow-small rounded-classic'>
				<div className='flex flex-col gap-y-1 justify-center items-center mb-8'>
					<span className='text-2xl text-white font-bold'>Log in to your Account</span>
					<span className='text-lg text-white/50 font-medium'>
						Welcome back! Please, enter your information
					</span>
				</div>
				<div className='flex basis-full w-full flex-col gap-y-10 items-center mb-3'>
					<Input
						onChange={e => {
							setUsername(e.target.value);
							if (e.target.value.length > 0 && error === MESSAGES.NO_USER_FOUND) {
								setError('');
							}
						}}
						title='Username'
					/>
					<Input
						onChange={e => {
							setPassword(e.target.value);
							if (e.target.value.length > 0 && error === MESSAGES.WRONG_PASSWORD) {
								setError('');
							}
						}}
						required
						isPassword
						maxLength={25}
						title='Password'
					/>
				</div>
				<div className='w-full flex justify-between items-center mb-2.5'>
					<label className='flex items-center gap-x-1'>
						<Checkbox checked onChange={e => void setChecked(e.target.checked)} />
						<span className='text-lg text-white font-medium'>Remember me</span>
					</label>
					<span className='text text-blue font-medium'>Forget password?</span>
				</div>
				<Error styles='self-center' message={error} />
				<Button
					disabled={Boolean(error || !password || !username)}
					onClick={() =>
						void authorizationService.logIn(username, password, setError, navigate,checked)
					}
					styles='min-h-10 bg-blue text-xl font-bold text-white mb-3'
					content='Log in'
				/>
				<div className='flex flex-col w-full items-center justify-center'>
					<span className='font-medium text-white'>Don't have an account?</span>
					<Link
						onClick={() => void authorizationService.continueWithoutRegistration()}
						className='-mt-0.5'
						to={pageConfig.main}
					>
						<span className='text-blue font-bold text-sm'>Continue without registration</span>
					</Link>
					<Link className='-mt-0.5' to={pageConfig.singUp}>
						<span className='text-blue font-bold text-sm'>Create an account</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
