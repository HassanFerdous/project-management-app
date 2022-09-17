import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRout';
import useAuthCheck from './hooks/useAuthCheck';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Teams from './pages/Teams';

function App() {
	useAuthCheck();
	return (
		<>
			<Router>
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
			</Router>
		</>
	);
}

export default App;
