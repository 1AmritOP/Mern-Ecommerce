import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StatsResponse } from "../../types/api-types";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
  }),
  endpoints: (builder) => ({
    stats: builder.query<StatsResponse, string>({
      query: (id) => `stats?id=${id}`,
    }),
    pie: builder.query<string, string>({
      query: (id) => `piecharts?id=${id}`,
    }),
    bar: builder.query<string, string>({
      query: (id) => `barcharts?id=${id}`,
    }),
    line: builder.query<string, string>({
      query: (id) => `linecharts?id=${id}`,
    }),
  }),
});

export const { useStatsQuery, usePieQuery, useBarQuery, useLineQuery } =
  dashboardApi;
