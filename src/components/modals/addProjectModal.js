import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddNewProjectMutation } from '../../features/project/projectApi';
import Input from '../Input';
import Modal from './modal';

function AddProjectModal({ control }) {
	const [formData, setFormData] = useState({ name: '', title: '', avatar: '' });
	const [addNewProject, { isLoading }] = useAddNewProjectMutation();
	const { email: loggedInUserEmail } = useSelector((state) => state.auth.user);

	const handleChange = (e) => {
		let target = e.target;
		setFormData({ ...formData, [target.name]: target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addNewProject({
			author: loggedInUserEmail,
			members: [loggedInUserEmail],
			stage: 'backlog',
			...formData,
			createdAt: new Date(),
		});
		setFormData({ name: '', title: '', avatar: '' });
		control(false);
	};
	return (
		<Modal control={control}>
			<form onSubmit={handleSubmit}>
				<Input
					type='text'
					placeholder='Project Name'
					name='name'
					required
					onChange={handleChange}
					value={formData?.name}
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
