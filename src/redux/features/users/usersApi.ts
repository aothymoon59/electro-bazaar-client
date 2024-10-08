import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users/get-all",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;
