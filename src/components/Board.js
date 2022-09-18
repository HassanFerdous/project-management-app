import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchProjectsQuery } from '../features/project/projectApi';
import Column from './Column';
import AddProjectModal from './modals/addProjectModal';
import Error from './ui/Error';
import Loader from './ui/Loader';

function Board() {
	const { email: loggedInUserEmail } = useSelector((state) => state?.auth?.user) || {};
	const {
		data: projects,
		isSuccess,
		isError,
		isLoading,
	} = useFetchProjectsQuery({ email: loggedInUserEmail, sort: 'id', order: 'desc' });

	const [showModal, setShowModal] = useState(false);
	const control = (value) => {
		setShowModal(value);
	};

	return (
		<>
			<div className='flex flex-grow px-10 mt-4 space-x-6 overflow-auto'>
				{isLoading && <Loader />}
				{!isLoading && isError && <Error message='some thing went wrong' />}

				{!isError && isSuccess && (
					<>
						<Column projects={projects} stage='Backlog' control={control}></Column>
						<Column projects={projects} stage='Ready'></Column>
						<Column projects={projects} stage='Doing'></Column>
						<Column projects={projects} stage='Review'></Column>
						<Column projects={projects} stage='Blocked'></Column>
						<Column projects={projects} stage='Done'></Column>
					</>
				)}
			</div>

			{showModal && <AddProjectModal control={control} />}
		</>
	);
}

export default Board;
