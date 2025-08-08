import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse } from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  endpoints: (builder) => ({
    latestProduct: builder.query<AllProductsResponse, string>({
      query: () => "latest",
    }),
    allProduct: builder.query<AllProductsResponse, string>({
        query: (id)=> `admin-products?id=${id}`
    })
  }),
});

export const { useLatestProductQuery, useAllProductQuery } = productApi;
