import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

export const getUserNames = async () => {
	const response = await axios.get('http://localhost:3000/users');
	return response.data
};
