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
  }),
});
export const { useGetMeQuery } = authApi;
