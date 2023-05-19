// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
     baseUrl: "http://localhost:3002",
     prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
    }),
  endpoints: (builder) => ({

    //recupération des données user 
    getContentByUser: builder.query({
      query: (id) => `users/${id}`,
      
    }),

    registerUser: builder.mutation({   
      //j'envoi un objet json avec l'id du user et le nom du tableau
      query: (body) => ({
        url: `users/create`,
        method: "POST",
        body: { name: body.name, lastname: body.lastName, email: body.email, password: body.password },
        onError: (error) => {
          // Gérer l'erreur ici
          console.log( error);
          // Vous pouvez également déclencher une action, afficher un message d'erreur, etc.
        },
      }),

    }),

    loginUser: builder.mutation({
      
      query: ({email}) => ({
        url: `users/findByEmail`,
        method: 'POST',
        body: {email:email},
      }),
    }),

    
    //je crée un tableau pour un user
    addTableByUser: builder.mutation({   
      //j'envoi un objet json avec l'id du user et le nom du tableau
      query: (body) => ({
        url: `tables`,
        method: "POST",
        body: { name: body.name, user_id: body.userId },
        onError: (error) => {
          // Gérer l'erreur ici
          console.log( error);
          // Vous pouvez également déclencher une action, afficher un message d'erreur, etc.
        },
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
          query: (id) => ({
            url: `lists/${id}`,
            method: "DELETE",
          }),
        }),
        
  
    }),


  })

 


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
//j'exporte les hooks pour les utiliser dans les composants fonctionnels
export const { useGetContentByUserQuery, useAddTableByUserMutation , useDeleteTableByUserMutation, useGetListsByTableQuery ,
useModifyTableByUserMutation , usePostListByUserMutation , useModifyListByTableMutation , useDeleteListByTableMutation ,useLoginUserMutation , useRegisterUserMutation } = userApi;
