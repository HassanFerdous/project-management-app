import { Link } from 'react-router-dom';
import SiteLogo from '../components/SiteLogo';
import logoLws from '../images/logo.png';
import Avatar from '../components/Avatar';
import Board from '../components/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Projects = () => {
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
						<Link className='mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700' to='/teams'>
							Teams
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
				<DndProvider backend={HTML5Backend}>
					<Board />
				</DndProvider>
			</div>
			<SiteLogo />
		</>
	);
};

export default Projects;
