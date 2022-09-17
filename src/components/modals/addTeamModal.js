import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddTeamMutation } from '../../features/team/teamApi';
import Input from '../Input';
import Modal from './modal';

function AddTeamModal({ control }) {
	const [name, setName] = useState('');
	const [title, setTitle] = useState('');
	const { user } = useSelector((state) => state.auth);

	const [addTeam, { isLoading }] = useAddTeamMutation(user?.email);

	const handleSubmit = (e) => {
		e.preventDefault();
		addTeam({ name, title, author: user, members: [user?.email], createdAt: new Date() });
		control(false);
	};

	return (
		<Modal control={control}>
			<form onSubmit={handleSubmit}>
				<Input type='text' placeholder='Team Name' required onChange={(e) => setName(e.target.value)} />
				<Input type='text' placeholder='Title' required onChange={(e) => setTitle(e.target.value)} />
				<div className='text-center text-right mt-4 flex'>
					<button
						className='inline-block w-auto px-4 py-3 py-2 bg-green-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
						type='submit'
						disabled={isLoading}>
						Create
					</button>
					<button
						className='ml-2 inline-block w-auto px-4 py-3 py-2 bg-red-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
						type='button'
						onClick={() => control(false)}>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	);
}

export default AddTeamModal;
