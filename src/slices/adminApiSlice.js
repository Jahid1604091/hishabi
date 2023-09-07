import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
const URL = '/api/admin';


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query:({search='',page})=> `${URL}/users?search=${search}&page=${page}`,
            providesTags:['Users'],
            
            // transformResponse: responseData=>responseData.data
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`${URL}/users/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Users']
        }),
        getAllDoctors: builder.query({
            query:({search,page})=> `${URL}/doctors?search=${search}&page=${page}`,
            providesTags:['Doctors'],
           
        }),
        approveAsDoctor:builder.mutation({
            query:(id)=>({
                url:`${URL}/approve-as-doctor/${id}`,
                method:'PUT',
            }),
            invalidatesTags:['Doctors']
        }),
        removeAsDoctor:builder.mutation({
            query:(id)=>({
                url:`${URL}/remove-as-doctor/${id}`,
                method:'PUT',
            }),
            invalidatesTags:['Doctors']
        }),

    })
});

export const {
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useGetAllDoctorsQuery,
    useApproveAsDoctorMutation,
    useRemoveAsDoctorMutation,
} = adminApiSlice;
