/* eslint-disable @typescript-eslint/no-explicit-any */
// import { TQueryParam } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/cart/create-cart",
        method: "POST",
        body: cartInfo,
      }),
      invalidatesTags: ["gadgets", "cart"],
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
