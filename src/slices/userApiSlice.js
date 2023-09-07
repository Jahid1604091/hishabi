import { apiSlice, countryApiSlice } from "./apiSlice";
const URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (data) => ({
                url: `${URL}/auth`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        getUserInfoFromGoogleLogin: builder.query({
            query: () =>  `/auth/login/success`,
            providesTags: ['User']
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${URL}/auth/forgot-password`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: `${URL}/auth/reset-password/${data.token}`,
                method: 'PUT',
                body:data
            }),
            invalidatesTags: ['User']
        }),

        registerAsDoctor: builder.mutation({
            query: (data) => ({
                url: `${URL}/apply-as-doctor`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${URL}/profile`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        deleteProfile: builder.mutation({
            query: () => ({
                url: `${URL}/profile`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),

        deleteAppointment: builder.mutation({
            query: (id) => ({
                url: `${URL}/appointments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),

        markAllAsRead: builder.mutation({
            query: () => ({
                url: `${URL}/mark-all-as-read`,
                method: 'PUT',
            }),
            invalidatesTags: ['User']
        }),

        getAllApprovedDoctors: builder.query({
            query: ({search,page}) => `${URL}/approved-doctors?search=${search}&page=${page}`,
            // transformResponse: (response, meta, arg) => response.data,
            // transformErrorResponse: (response, meta, arg) => response.status,
            providesTags: ['User'],
           
        }),

        getAllAppointments: builder.query({
            query: () => `${URL}/booked-appointments`,
            providesTags: ['User']
        }),

        newAppointment: builder.mutation({
            query: (data) => ({
                url: `${URL}/appointment`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User']
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${URL}/logout`,
                method: 'POST',
            }),
            invalidatesTags: ['User']
        }),

        logoutGoogle: builder.query({
            query: () => `/auth/logout`,
            providesTags: ['User']
        }),

        uploadAvatar: builder.mutation({
            query: (data) => ({
                url: `/api/upload/avatar`,
                method: 'POST',
                body: data,
                formData: true
            }),
            invalidatesTags: ['User']
        }),

        uploadFile: builder.mutation({
            query: (data) => ({
                url: `api/upload/file`,
                method: 'POST',
                body: data,
                formData: true
            }),
            invalidatesTags: ['User']
        }),
        makePayment: builder.mutation({
            query: (data) => ({
                url: `api/payment/ssl-request`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User']
        }),



    })
});

export const {
    useLoginMutation,
    useGetUserInfoFromGoogleLoginQuery,
    useRegisterMutation,
    useRegisterAsDoctorMutation,
    useUpdateProfileMutation,
    useDeleteProfileMutation,
    useMarkAllAsReadMutation,
    useGetAllApprovedDoctorsQuery,
    useGetAllAppointmentsQuery,
    useNewAppointmentMutation,
    useLogoutMutation,
    useLogoutGoogleQuery,
    useDeleteAppointmentMutation,
    useUploadFileMutation,
    useUploadAvatarMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useMakePaymentMutation,
  

} = userApiSlice;
