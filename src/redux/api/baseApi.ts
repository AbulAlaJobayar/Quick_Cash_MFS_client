import { axiosBaseQuery } from "@/helper/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl:
      "https://quickcash-server.vercel.app/api/v1",
  }),
  endpoints: () => ({}),
  //   todo :: set tag type
});
