import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useOnClickOutside } from '../utils';

export default function Avatar() {
	const infoRef = useRef();
	const [showInfo, setShowInfo] = useState(false);

	useOnClickOutside(infoRef, () => {
		setShowInfo(false);
	});
	return (
		<>
			<div className='relative'>
				<div
					className='flex items-center cursor-pointer'
					onClick={() => {
						setShowInfo(!showInfo);
					}}>
					<button className='flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer'>
						<img
							src='https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512'
							alt=''
						/>
					</button>
					<p className='ml-2'>Jon doe</p>
				</div>
				{showInfo && (
					<div className='absolute bg-white border border-gray-500 py-1 px-2 right-0' ref={infoRef}>
						<ul>
							<li>jon@gamil.com</li>
							<li>
								<button className='font-semibold text-sm hover:text-indigo-700'>Log out</button>
							</li>
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
