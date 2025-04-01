import { tagType } from "./../tagType";
import { baseApi } from "./baseApi";
const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    todayTransaction: build.query({
      query: () => ({
        url: "/transaction/today_transaction",
        method: "GET",
      }),
      providesTags: [tagType.transaction],
    }),
    myTransaction: build.query({
      query: () => ({
        url: "/transaction/my_transaction",
        method: "GET",
      }),
      providesTags: [tagType.transaction],
    }),
    monthlyTransaction: build.query({
      query: () => ({
        url: "/transaction/monthly",
        method: "GET",
      }),
      providesTags: [tagType.transaction],
    }),
    cashOut: build.mutation({
      query: (payload) => ({
          url: "/transaction/cash_out",
          method: "POST",
          data: payload,
      }),
      invalidatesTags: [tagType.transaction,tagType.notification],
    }),
    cashIn: build.mutation({
      query: (payload) => ({
          url: "/transaction/cash_in",
          method: "POST",
          data: payload,
      }),
      invalidatesTags: [tagType.transaction,tagType.notification],
    }),
    sendMoney: build.mutation({
      query: (payload) => ({
          url: "/transaction/send_money",
          method: "POST",
          data: payload,
      }),
      invalidatesTags: [tagType.transaction,tagType.notification],
    }),
  }),
});
export const {
  useTodayTransactionQuery,
  useMyTransactionQuery,
  useMonthlyTransactionQuery,
  useCashOutMutation,
  useSendMoneyMutation,
  useCashInMutation
} = transactionApi;
