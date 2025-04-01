import { tagType } from './../tagType';
import { baseApi } from "./baseApi";
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({
        url: "/users/user_profile",
        method: "GET",
      }),
      providesTags:[tagType.auth]
    }),
    userUpdate: build.mutation({
      query: (data) => ({
        url: "/users/user_update",
        method: "PUT",
        data
      }),
      invalidatesTags:[tagType.auth]
    }),
  }),
});
export const { useGetMeQuery,useUserUpdateMutation } = authApi;
