import 'normalize.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Page } from './components/Page';
import { LogIn } from './components/auth/LogIn';
import { SingUp } from './components/auth/SingUp';
import { LOCAL_STORAGE } from './constants/LocalStorage';
import './index.css';
import './styles/lib/Popup.scss';

export function App() {
	console.log(localStorage[LOCAL_STORAGE.IS_SING_UP] === LOCAL_STORAGE.IS_LOGGED);
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						localStorage[LOCAL_STORAGE.IS_SING_UP] === LOCAL_STORAGE.IS_LOGGED ? (
							<Page />
						) : (
							<LogIn />
						)
					}
				/>
				<Route element={<LogIn />} path='/frontend/src/components/auth/LogIn.tsx' />
				<Route element={<SingUp />} path='/frontend/src/components/auth/SingUp.tsx' />
				<Route element={<Page />} path='/frontend/src/components/Page.tsx' />
			</Routes>
		</BrowserRouter>
	);
}
