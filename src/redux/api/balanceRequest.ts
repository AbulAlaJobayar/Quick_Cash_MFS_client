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
    MyBalanceRequest: build.query({
      query: () => ({
        url: "/balanceRequest/my_balance_request",
        method: "GET",
      }),
     providesTags:[tagType.requestBalance]
    }),
    totalRequest: build.query({
      query: () => ({
        url: "/balanceRequest/total_request",
        method: "GET",
      }),
     providesTags:[tagType.requestBalance]
    }),
    approvedRequest: build.mutation({
      query: (data) => ({
        url: "/balanceRequest/approved_request",
        method: "PUT",
        data
      }),
     invalidatesTags:[tagType.requestBalance,tagType.notification]
    }),

  }),
});
export const {useCreateBalanceMutation,useMyBalanceRequestQuery,useTotalRequestQuery,useApprovedRequestMutation } =requestBalance;
