//@ts-nocheck
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './views/Home';
import Overview from './views/Overview';
import Writing from './views/Writing';
import Characters from './views/Characters';
import Maps from './views/Maps';
import Profile from './views/Profile';


const App = (props: AppProps) => {
	return(
		<BrowserRouter>
			<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/overview' element={<Overview />} />
					<Route path='/writing' element={<Writing />} />
					<Route path='/characters' element={<Characters />} />
					<Route path='/maps' element={<Maps />} />
					<Route path='/profile' element={<Profile />} />
				</Routes>
		</BrowserRouter>
	)
};

interface AppProps {}

export default App;



//----------------------------------------------------------------------------------------------------------
//redux work with Luke:

// import { useSelector, useDispatch } from 'react-redux';
// import { login, logout } from './features/auth/auth-slice';


// const dispatch = useDispatch();
// const { loggedIn } = useSelector(state => state.auth);

// const test = () => {
// 	console.log(logout());
// 	dispatch(logout());
// }

// return (
// 	<main className="container my-5">
// 		<h1 className="text-primary text-center">{loggedIn ? 'Logged In' : 'Logged Out'}</h1>
// 		<button onClick={() => dispatch(login())}>Login</button>
// 		<button onClick={test}>Logout</button>
// 	</main>
// );