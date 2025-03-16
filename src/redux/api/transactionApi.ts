import { tagType } from './../tagType';
import { baseApi } from "./baseApi";
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    todayTransaction: build.query({
      query: () => ({
        url: "/transaction/today_transaction",
        method: "GET",
      }),
      providesTags:[tagType.transaction]
    }),
    
  }),
});
export const {useTodayTransactionQuery } = authApi;
