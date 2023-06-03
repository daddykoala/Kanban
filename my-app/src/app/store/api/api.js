import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//j'importe le store pour pouvoir utiliser le token
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
    }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({email,password}) => ({
        url: `users/findByEmail`,
        method: 'POST',
        body: {email:email, password:password},
      }),
    }), 
    getMe: builder.query({
      query: () => '/users/me',
    }),
    
    getContentByUser: builder.query({
      query: (id) => `users/${id}`,
    }),

    registerUser: builder.mutation({   

      query: (body) => ({
        url: `users/create`,
        method: "POST",
        body: { name: body.name, lastname: body.lastName, email: body.email, password: body.password },       
      }),
    }),

    addTableByUser: builder.mutation({   
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

    modifyTableByUser: builder.mutation({
      query: ({name,id}) => ({
        url: `tables/${id}`,
        method: "PATCH",
        body: { name: name },
      }),
    }),
    //recupération des listes du user en bddd
    getListsByTable: builder.query({
      query: (id) => `lists/${id}`,
    }),

    //création d'une liste pour un tableau
      postListByUser: builder.mutation({
        query: ({name,tableId}) => ({
          url: `lists/`,
          method: "POST",
          body: { name: name, tableId:tableId },
      }),
    }),


      modifyListByTable: builder.mutation({
        query: ({name,id,position}) => ({
          url: `lists/${id}`,
          method: "PATCH",
          body: { name: name },
        }),
      }),

        deleteListByTable: builder.mutation({
          query: ({id,tableId}) => ({
            url: `lists/${id}`,
            method: "DELETE",
            body: { tableId: tableId },
          }),
        }),
        //création d'une liste pour un tableau
      postCardByList: builder.mutation({
        query: ({name,list_id}) => ({
          url: `cards/`,
          method: "POST",
          body: { name, list_id },
      }),
    }),
    }),
  })

export const { useGetContentByUserQuery, useAddTableByUserMutation , useDeleteTableByUserMutation, useGetListsByTableQuery ,
useModifyTableByUserMutation , usePostListByUserMutation , useModifyListByTableMutation , useDeleteListByTableMutation ,useLoginUserMutation , useRegisterUserMutation 
,useGetMeQuery , usePostCardByListMutation } = userApi;
