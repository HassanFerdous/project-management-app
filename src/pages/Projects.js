import { Link } from 'react-router-dom';
import SiteLogo from '../components/SiteLogo';
import logoLws from '../images/logo.png';
import Project from '../components/Project';
import AddProjectModal from '../components/modals/addProjectModal';
import { useState } from 'react';
import Avatar from '../components/Avatar';

const Projects = () => {
	const [showModal, setShowModal] = useState(false);
	const control = (value) => {
		setShowModal(value);
	};
	return (
		<>
			<div className='flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200'>
				<div className='flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75'>
					<img src={logoLws} className='h-10 w-10' alt='' />
					<input
						className='flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring'
						type='search'
						placeholder='Search for anything…'
					/>
					<div className='ml-10 grow'>
						<Link className='mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700' to='/'>
							Team
						</Link>
						<Link className='mx-2 text-sm font-semibold text-indigo-700' to='/projects'>
							Projects
						</Link>
					</div>
					<Avatar />
				</div>
				<div className='px-10 mt-6'>
					<h1 className='text-2xl font-bold'>Project Board</h1>
				</div>
				<div className='flex flex-grow px-10 mt-4 space-x-6 overflow-auto'>
					<div className='flex flex-col flex-shrink-0 w-72'>
						<div className='flex items-center flex-shrink-0 h-10 px-2'>
							<span className='block text-sm font-semibold'>Backlog</span>
							<span className='flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30'>
								6
							</span>
							<button
								className='flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100'
								onClick={() => control(!showModal)}>
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
						<div className='flex flex-col pb-2 overflow-auto scrollbar'>
							<Project />
							<Project />
							<Project />
							<Project />
							<Project />
							<Project />
						</div>
					</div>
					<div className='flex flex-col flex-shrink-0 w-72'>
						<div className='flex items-center flex-shrink-0 h-10 px-2'>
							<span className='block text-sm font-semibold'>Ready</span>
							<span className='flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30'>
								3
							</span>
						</div>
						<div className='flex flex-col pb-2 overflow-auto scrollbar'>
							<Project />
							<Project />
							<Project />
							<Project />
							<Project />
						</div>
					</div>
					<div className='flex flex-col flex-shrink-0 w-72'>
						<div className='flex items-center flex-shrink-0 h-10 px-2'>
							<span className='block text-sm font-semibold'>Doing</span>
							<span className='flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30'>
								2
							</span>
						</div>
						<div className='flex flex-col pb-2 overflow-auto scrollbar'>
							<Project />
							<Project />
							<Project />
							<Project />
							<Project />
							<Project />
						</div>
					</div>
					<div className='flex flex-col flex-shrink-0 w-72'>
						<div className='flex items-center flex-shrink-0 h-10 px-2'>
							<span className='block text-sm font-semibold'>Review</span>
							<span className='flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30'>
								3
							</span>
						</div>
						<div className='flex flex-col pb-2 overflow-auto scrollbar'>
							<Project />
							<Project />
						</div>
					</div>
					<div className='flex flex-col flex-shrink-0 w-72'>
						<div className='flex items-center flex-shrink-0 h-10 px-2'>
							<span className='block text-sm font-semibold'>Blocked</span>
							<span className='flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30'>
								1
							</span>
						</div>
						<div className='flex flex-col pb-2 overflow-auto scrollbar'>
							<Project />
							<Project />
							<Project />
						</div>
					</div>
					<div className='flex flex-col flex-shrink-0 w-72'>
						<div className='flex items-center flex-shrink-0 h-10 px-2'>
							<span className='block text-sm font-semibold'>Done</span>
							<span className='flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30'>
								3
							</span>
						</div>
						<div className='flex flex-col pb-2 overflow-auto scrollbar'>
							<Project />
							<Project />
							<Project />
							<Project />
						</div>
					</div>
					<div className='flex-shrink-0 w-6' />
				</div>
			</div>
			{showModal && <AddProjectModal control={control} />}
			<SiteLogo />
		</>
	);
};

export default Projects;
