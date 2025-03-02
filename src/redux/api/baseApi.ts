import { axiosBaseQuery } from "@/helper/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl:`${process.env.BACKEND_URL}`,
  }),
  endpoints: () => ({}),
  //   todo :: set tag type
});
