import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Teams from './pages/Teams';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/teams' element={<Teams />} />
					<Route path='/projects' element={<Projects />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
