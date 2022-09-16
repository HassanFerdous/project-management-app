import Input from '../Input';
import Modal from './modal';

function AddProjectModal({ toggleModal }) {
	return (
		<Modal toggleModal={toggleModal}>
			<form>
				<Input type='text' placeholder='Project Name' required />
				<Input type='text' placeholder='Title' required />
				<div className='text-center text-right mt-4 flex'>
					<button
						className='inline-block w-auto px-4 py-3 py-2 bg-green-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
						type='submit'>
						Create
					</button>
					<button
						className='ml-2 inline-block w-auto px-4 py-3 py-2 bg-red-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
						type='button'
						onClick={toggleModal}>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	);
}

export default AddProjectModal;
