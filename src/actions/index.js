import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/users/currentuser');
	dispatch({ type: FETCH_USER, payload: res.data.currentUser });
};
