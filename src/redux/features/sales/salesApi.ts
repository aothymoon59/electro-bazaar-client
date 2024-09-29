/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSale: builder.mutation({
      query: (saleInfo) => ({
        url: "/sales/create-sale",
        method: "POST",
        body: saleInfo,
      }),
      invalidatesTags: ["gadgets"],
    }),
    getSaleHistory: builder.query({
      query: (args: any) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            if (item?.value) {
              params.append(item.name, item.value as string);
            }
          });
        }

        return {
          url: `/sales/get-sales-history`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["gadgets"],
    }),
  }),
});

export const { useAddSaleMutation, useGetSaleHistoryQuery } = salesApi;
