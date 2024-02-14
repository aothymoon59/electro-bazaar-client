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
      query: (value: string) => {
        const params = new URLSearchParams();

        if (value) {
          params.append("filterBy", value);
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
