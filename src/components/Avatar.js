import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { useOnClickOutside } from '../utils';

export default function Avatar() {
	const infoRef = useRef();
	const [showInfo, setShowInfo] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth) || {};

	//logout
	const handleLogOut = () => {
		dispatch(logout());
		navigate('/', { replace: true });
	};

	//click-outside
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
					<p className='ml-2'>{user?.name}</p>
				</div>
				{showInfo && (
					<div className='absolute bg-white border border-gray-500 py-1 px-2 right-0' ref={infoRef}>
						<ul>
							<li>{user?.email}</li>
							<li>
								<button className='font-semibold text-sm hover:text-indigo-700' onClick={handleLogOut}>
									Log out
								</button>
							</li>
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
