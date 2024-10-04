/* eslint-disable @typescript-eslint/no-explicit-any */

import { TQueryParam } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const gadgetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addGadget: builder.mutation({
      query: (gadgetInfo) => ({
        url: "/products/create-product",
        method: "POST",
        body: gadgetInfo,
      }),
      invalidatesTags: ["gadgets"],
    }),
    getAllGadgets: builder.query({
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
          url: `/products/get-products`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["gadgets"],
    }),
    getSingleGadget: builder.query({
      query: (id) => ({
        url: `/products/get-product/${id}`,
        method: "GET",
      }),
      providesTags: ["gadgets"],
    }),
    updateGadget: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/products/update-product/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["gadgets"],
    }),
    deleteMultiple: builder.mutation({
      query: (ids: string[]) => ({
        url: `/products/delete-multiple-products`,
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["gadgets"],
    }),
    deleteGadget: builder.mutation({
      query: (id: string) => ({
        url: `/products/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gadgets"],
    }),
  }),
});

export const {
  useAddGadgetMutation,
  useGetSingleGadgetQuery,
  useGetAllGadgetsQuery,
  useUpdateGadgetMutation,
  useDeleteMultipleMutation,
  useDeleteGadgetMutation,
} = gadgetsApi;
