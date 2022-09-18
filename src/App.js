import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import useAuthCheck from './hooks/useAuthCheck';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Teams from './pages/Teams';

function App() {
	const authChecked = useAuthCheck();

	return !authChecked ? (
		<div>Checking authentication....</div>
	) : (
		<Routes>
			<Route
				path='/teams'
				element={
					<PrivateRoute>
						<Teams />
					</PrivateRoute>
				}
			/>
			<Route
				path='/projects'
				element={
					<PrivateRoute>
						<Projects />
					</PrivateRoute>
				}
			/>
			<Route path='/' element={<Login />} />
		</Routes>
	);
}

export default App;
