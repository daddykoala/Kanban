// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  endpoints: (builder) => ({
    getContentByUser: builder.query({
      query: (id) => `users/${id}`,
    }),

    getListsByTable: builder.query({
      query: (id) => `lists/`,
    }),
    //je crée un tableau pour un user
    addTableByUser: builder.mutation({
      
      //j'envoi un objet json avec l'id du user et le nom du tableau
      query: (body) => ({
        url: `tables`,
        method: "POST",
        body: { name: body.name, user_id: body.userId },
      }),

    }),

    deleteTableByUser: builder.mutation({
      query: (id) => ({
        url: `tables/${id}`,
        method: "DELETE",
      }),
    }),


  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
//j'exporte les hooks pour les utiliser dans les composants fonctionnels
export const { useGetContentByUserQuery, useAddTableByUserMutation , useDeleteTableByUserMutation, useGetListsByTableQuery } = userApi;
