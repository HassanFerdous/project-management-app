import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchProjectsQuery } from '../features/project/projectApi';
import { setAssignedProjectsQuery } from '../features/project/projectSlice';
import { useGetTeamsQuery } from '../features/team/teamApi';
import Column from './Column';
import AddProjectModal from './modals/addProjectModal';
import Error from './ui/Error';
import Loader from './ui/Loader';

function Board() {
	const [isSkip, setIsSkip] = useState(true);
	const { email: loggedInUserEmail } = useSelector((state) => state?.auth?.user) || {};
	const { assignedProjectsQuery } = useSelector((state) => state.projects);
	const dispatch = useDispatch();

	//fetch Assign project
	const {
		data: projects,
		isSuccess,
		isError,
		isLoading,
	} = useFetchProjectsQuery(
		{ assignedProjectsQuery, sort: 'id', order: 'desc' },
		{
			skip: isSkip,
			refetchOnMountOrArgChange: true,
		}
	);

	//get assigned teams
	const { data: teams, isLoading: teamsLoading, isSuccess: teamsLoadingSuccess } = useGetTeamsQuery(loggedInUserEmail);

	//set assigned Teams query to store
	useEffect(() => {
		if (!teamsLoading && teamsLoadingSuccess && teams?.length) {
			let assignedTeamsQuery = teams?.map((team) => `team=${team.name.toLowerCase()}`).join('&');
			dispatch(setAssignedProjectsQuery(assignedTeamsQuery));
			setIsSkip(false);
		}
	}, [teams, teamsLoading, teamsLoadingSuccess, dispatch]);

	//control modal
	const [showModal, setShowModal] = useState(false);
	const control = (value) => {
		setShowModal(value);
	};

	return (
		<>
			<div className='flex flex-grow px-10 mt-4 space-x-6 overflow-auto'>
				{isLoading && <Loader message='loading...' />}
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

			{showModal && <AddProjectModal control={control} assignedTeams={teams} />}
		</>
	);
}

export default Board;
