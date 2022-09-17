import apiSlice from '../api/apiSlice';
const projectApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//fetch project
		fetchProjects: builder.query({
			query: (query) => {
				let { email, sort, order } = query || {};
				let queryString = '';
				if (email) queryString += email;
				if (sort) queryString += `&_sort=${sort}`;
				if (order) queryString += `&_order=${order}`;

				return {
					url: `/projects?${queryString}`,
				};
			},
		}),

		//project
		addNewProject: builder.mutation({
			query: (data) => ({
				url: '/projects',
				method: 'POST',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const { data: newProject } = await queryFulfilled;
					if (newProject?.id) {
						dispatch(
							projectApi.util.updateQueryData(
								'fetchProjects',
								{ email: newProject.author, sort: 'id', order: 'desc' },
								(draft) => {
									draft.unshift(newProject);
								}
							)
						);
					}
				} catch (error) {
					console.log(error);
				}
			},
		}),

		//update project
		updateProject: builder.mutation({
			query: ({ id, email, stage }) => {
				return {
					query: `/projects/${id}`,
					method: 'PATCH',
					body: { stage },
				};
			},

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(
						projectApi.util.updateQueryData(
							'fetchProjects',
							{ email: arg.email, sort: 'id', order: 'desc' },
							(draft) => {
								return (draft = draft.map((project) =>
									project.id === arg.id ? { ...project, stage: arg.stage } : project
								));
							}
						)
					);
				} catch (error) {}
			},
		}),

		//delete project
		deleteProject: builder.mutation({
			query: ({ id, author }) => ({
				url: `/projects/${id}`,
				method: 'DELETE',
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(
						projectApi.util.updateQueryData(
							'fetchProjects',
							{ email: arg.author, sort: 'id', order: 'desc' },
							(draft) => {
								return (draft = draft.filter((project) => project.id !== arg.id));
							}
						)
					);
				} catch (error) {}
			},
		}),
	}),
});

export const { useFetchProjectsQuery, useAddNewProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } =
	projectApi;
