//@ts-nocheck
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './views/Home';
import Overview from './views/Overview';
import Articles from './views/Articles';
import Writing from './views/Writing';
import Characters from './views/Characters';
import CharacterSpec from './views/CharacterSpec';
import Maps from './views/Maps';
import MapSpec from './views/MapSpec';
import MapEdit from './views/MapEdit';
import Profile from './views/Profile';
import Login from '../client/views/Login';
import Register from './views/Register';
import ArticleSpec from './views/ArticleSpec';
import ArticleEdit from './views/ArticleEdit';
import CharacterEdit from './views/CharacterEdit';


const App = (props: AppProps) => {
	return(
		<BrowserRouter>
			<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/overview' element={<Overview />} />
					<Route path='/writing' element={<Writing />} />
					<Route path='/characters' element={<Characters />} />
					<Route path='/characters/:id' element={<CharacterSpec />} />
					<Route path='/characters/edit/:id' element={<CharacterEdit />} />
					<Route path='/maps' element={<Maps />} />
					<Route path='/maps/:id' element={<MapSpec />} />
					<Route path='/maps/edit/:id' element={<MapEdit />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/articles' element={<Articles />} />
					<Route path='/articles/:id' element={<ArticleSpec />} />
					<Route path='/articles/edit/:id' element={<ArticleEdit />} />
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