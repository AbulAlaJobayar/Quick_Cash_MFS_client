import { tagType } from './../tagType';
import { baseApi } from "./baseApi";
const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allUsers: build.query({
      query: () => ({
        url: "/users/all_users",
        method: "GET",
      }),
     providesTags:[tagType.user]
    }),
    deleteAgent: build.mutation({
      query: (data) => ({
        url: "/users/user_delete",
        method: "PUT",
        data
      }),
     invalidatesTags:[tagType.user]
    }),
  }),
});
export const {useAllUsersQuery,useDeleteAgentMutation} =userApi
