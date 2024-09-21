import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
const URL = '/api/admin';


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPaperdetails: builder.query({
            query: () => `${URL}/details`,
            providesTags: ['Papers']
        }),

        addPaperDetails:builder.mutation({
            query:(data)=>({
                url:`${URL}/paper/add-details`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Papers']
        }),

        updatePaperDetails:builder.mutation({
            query:({id,data})=>({
                url:`${URL}/paper/update-details/${id}`,
                method:'PATCH',
                body:data
            }),
            invalidatesTags:['Papers']
        }),

        deletePaperDetails:builder.mutation({
            query:(id)=>({
                url:`${URL}/paper/delete-details/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Papers']
        }),

    })
});

export const {
   useGetAllPaperdetailsQuery,
   useAddPaperDetailsMutation,
   useUpdatePaperDetailsMutation,
   useDeletePaperDetailsMutation
} = adminApiSlice;
