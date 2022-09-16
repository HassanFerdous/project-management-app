import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SiteLogo from '../components/SiteLogo';
import logoLws from '../images/logo.png';
import Team from '../components/Team';
import AddTeamModal from '../components/modals/addTeamModal';
import Avatar from '../components/Avatar';
import { useEffect } from 'react';

function Teams() {
	const [showModal, setShowModal] = useState(false);
	const toggleModal = () => {
		setShowModal(!showModal);
	};

	useEffect(() => {}, []);

	return (
		<>
			<div className='flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200'>
				<div className='flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75'>
					<img src={logoLws} className='h-10 w-10' alt='' />
					<div className='ml-10 grow'>
						<Link className='mx-2 text-sm font-semibold text-gray-600 text-indigo-700' to='/'>
							Teams
						</Link>
						<Link className='mx-2 text-sm font-semibold hover:text-indigo-700' to='/projects'>
							Projects
						</Link>
					</div>
					<Avatar />
				</div>
				<div className='px-10 mt-6 flex justify-between'>
					<h1 className='text-2xl font-bold'>Teams</h1>
					<button
						className='flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100'
						onClick={toggleModal}>
						<svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 6v6m0 0v6m0-6h6m-6 0H6'
							/>
						</svg>
					</button>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto'>
					<Team />
					<Team />
					<Team />
					<Team />
					<Team />
				</div>
			</div>
			{showModal && <AddTeamModal toggleModal={toggleModal} />}
			<SiteLogo />
		</>
	);
}

export default Teams;
