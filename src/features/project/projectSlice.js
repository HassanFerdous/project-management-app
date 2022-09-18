import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
	name: 'project',
	initialState: {
		assignedProjectsQuery: '',
	},

	reducers: {
		setAssignedProjectsQuery: (state, action) => {
			state.assignedProjectsQuery = action.payload;
		},
	},
});

export const { setAssignedProjectsQuery } = projectSlice.actions;
export default projectSlice.reducer;
