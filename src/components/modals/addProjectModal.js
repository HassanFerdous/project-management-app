import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddNewProjectMutation } from '../../features/project/projectApi';
import Input from '../Input';
import Modal from './modal';
import Select from 'react-select';

function AddProjectModal({ control, assignedTeams }) {
	const [formData, setFormData] = useState({ team: '', title: '', avatar: '' });
	const [addNewProject, { isLoading }] = useAddNewProjectMutation();
	const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);

	//handle input change
	const handleChange = (e) => {
		let target = e.target;
		setFormData({ ...formData, [target.name]: target.value });
	};

	//show assigned teams to select options
	const options = assignedTeams?.map((team) => ({ label: team.name, value: team.name }));

	//submit add new project from
	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.title.trim() && formData.team.trim() && formData.avatar.trim()) {
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
		}
	};

	return (
		<Modal control={control}>
			<form onSubmit={handleSubmit}>
				<Select
					placeholder={'Select team'}
					options={options}
					noOptionsMessage={() => 'your not assigned to this team or team not exist'}
					isSearchable={true}
					onChange={(selectedOption) => setFormData({ ...formData, team: selectedOption.value })}
				/>

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
