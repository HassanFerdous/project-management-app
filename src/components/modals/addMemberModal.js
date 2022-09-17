import React, { useRef } from 'react';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { debounce, useOnClickOutside } from '../../utils';

export default function AddMemberModal({ toggleModal }) {
	const [selectedOption, setSelectedOption] = useState({});
	const ref = useRef();
	useOnClickOutside(ref, () => {
		toggleModal();
	});
	//load option
	const loadOption = async (inputValue, callback) => {
		try {
			let res = await fetch('https://jsonplaceholder.typicode.com/users');
			let data = await res.json();
			let loadedOption = data
				.map((user) => ({ label: user.email.toLowerCase(), value: user.email.toLowerCase() }))
				.filter((option) => option.label.toLowerCase().includes(inputValue));
			callback(loadedOption);
		} catch (error) {
			console.log(error);
		}
	};

	//option change
	const handleChange = (selectedOption) => {
		setSelectedOption(selectedOption);
	};

	//submit
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!selectedOption?.value?.trim()) return;
		toggleModal();
	};

	return (
		<form className='absolute top-0 right-0 w-4/6 p-4 bg-white shadow-md' onSubmit={handleSubmit} ref={ref}>
			<AsyncSelect
				loadOptions={debounce(loadOption, 500)}
				placeholder='Type email'
				onChange={handleChange}
				className='text-xs'
			/>
			<div className='text-center text-right mt-2 flex'>
				<button
					className='inline-block w-auto px-2 py-1 py-2 bg-green-300 rounded font-semibold text-sm order-1 text-xs leading-3'
					type='submit'>
					Add
				</button>
				<button
					className='ml-2 inline-block w-auto px-2 py-1 py-1 bg-red-300 rounded font-semibold text-sm order-1 text-xs leading-3'
					type='button'
					onClick={toggleModal}>
					Cancel
				</button>
			</div>
		</form>
	);
}
