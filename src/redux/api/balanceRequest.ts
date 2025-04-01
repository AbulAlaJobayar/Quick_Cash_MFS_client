import { tagType } from './../tagType';
import { baseApi } from "./baseApi";
const requestBalance = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBalance: build.mutation({
      query: (data) => ({
        url: "/balanceRequest/create_request",
        method: "POST",
        data
      }),
      invalidatesTags:[tagType.requestBalance]
    }),
    userUpdate: build.mutation({
      query: (data) => ({
        url: "/users/user_update",
        method: "PUT",
        data
      }),
      invalidatesTags:[tagType.auth,tagType.notification]
    }),
  }),
});
export const {useCreateBalanceMutation } =requestBalance;
