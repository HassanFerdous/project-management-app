import apiSlice from '../api/apiSlice';

const teamApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTeams: builder.query({
			query: (email) => {
				return {
					url: `/teams?members_like=${email}`,
				};
			},
			providesTags: (result, error, arg) => {
				return result ? [...result.map(({ id }) => ({ type: 'Team', id }), 'Team')] : 'Team';
			},
		}),

		getTeamById: builder.query({
			query: (id) => {
				return {
					url: `/teams?id=${id}`,
				};
			},
		}),

		addTeam: builder.mutation({
			query: (data) => ({
				url: '/teams',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Team'],
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
			invalidatesTags: (result, error, arg) => {
				return [{ type: 'Team', id: arg?.id }];
			},
		}),
	}),
});

export default teamApi;
export const { useGetTeamsQuery, useAddTeamMutation, useUpdateTeamMutation } = teamApi;
