import { current } from '@reduxjs/toolkit';
import apiSlice from '../api/apiSlice';

const teamApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTeams: builder.query({
			query: (email) => {
				return {
					url: `/teams?members_like=${email}`,
				};
			},
		}),

		addTeam: builder.mutation({
			query: (data) => ({
				url: '/teams',
				method: 'POST',
				body: data,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					let { data: team } = await queryFulfilled;
					let { email } = team.author;
					dispatch(
						teamApi.util.updateQueryData('getTeams', email, (draft) => {
							console.log(current(draft));
							draft.push(team);
						})
					);
				} catch (error) {}
			},
		}),

		updateTeam: builder.mutation({
			query: (data) => {
				let { id, members } = data || {};
				let updatedTeam = {};
				if (members?.length) updatedTeam = { ...updatedTeam, members };
				return {
					url: `/teams/${id}`,
					method: 'PATCH',
					body: updatedTeam,
				};
			},

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					let { data: updatedTeam } = await queryFulfilled;
					let { email } = updatedTeam.author;
					dispatch(
						teamApi.util.updateQueryData('getTeams', email, (draft) => {
							return draft.map((team) =>
								team.id === updatedTeam.id ? { ...team, members: updatedTeam.members } : team
							);
						})
					);
				} catch (error) {
					console.log(error);
				}
			},
		}),
	}),
});

export default teamApi;
export const { useGetTeamsQuery, useAddTeamMutation, useUpdateTeamMutation } = teamApi;
