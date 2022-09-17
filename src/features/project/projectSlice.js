import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
	name: 'project',
	initialState: {
		project: [],
	},

	reducers: {
		loadProjects: (state, action) => {
			state.project = action.payload;
		},
	},
});
