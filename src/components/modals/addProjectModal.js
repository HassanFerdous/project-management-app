import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddNewProjectMutation } from '../../features/project/projectApi';
import Input from '../Input';
import Modal from './modal';

function AddProjectModal({ control, assignedTeams }) {
	const [formData, setFormData] = useState({ team: '', title: '', avatar: '' });
	const [addNewProject, { isLoading }] = useAddNewProjectMutation();
	const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const handleChange = (e) => {
		let target = e.target;
		setFormData({ ...formData, [target.name]: target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isAssigned = assignedTeams.map((team) => team.name.toLowerCase()).includes(formData.team.toLowerCase());
		if (!isAssigned) {
			setError(true);
			setErrorMsg(`You are not assigned to "${formData.team}" or team not exist!!`);
			return;
		}
		setError(false);
		setErrorMsg(``);
		addNewProject({
			author: loggedInUserEmail,
			team: formData?.team.toLowerCase(),
			title: formData?.title,
			avatar: formData?.avatar,
			stage: 'backlog',
			createdAt: new Date(),
		});
		setFormData({ team: '', title: '', avatar: '' });
		control(false);
	};
	return (
		<Modal control={control}>
			<form onSubmit={handleSubmit}>
				<Input
					type='text'
					placeholder='Team name'
					name='team'
					required
					onChange={handleChange}
					value={formData?.team}
				/>
				{error && <p className='text-xs text-red-500'>{errorMsg}</p>}

				<Input
					type='text'
					placeholder='Title'
					name='title'
					required
					onChange={handleChange}
					value={formData?.title}
				/>
				<Input
					type='text'
					placeholder='Avatar-url'
					name='avatar'
					required
					onChange={handleChange}
					value={formData?.avatar}
				/>
				<div className='text-center text-right mt-4 flex'>
					<button
						className='inline-block w-auto px-4 py-3 py-2 bg-green-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
						type='submit'>
						Create
					</button>
					<button
						className='ml-2 inline-block w-auto px-4 py-3 py-2 bg-red-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
						type='button'
						disabled={isLoading}
						onClick={() => control(false)}>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	);
}

export default AddProjectModal;
