import { axiosBaseQuery } from "@/helper/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypeList } from "../tagType";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: `http://localhost:5000/api/v1`,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
