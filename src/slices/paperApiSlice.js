import { apiSlice } from "./apiSlice";
const URL = '/api/paper';

export const paperApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPaperdetails: builder.query({
            query: () => `${URL}/details`,
            providesTags: ['Papers']
        }),
    })
});

export const {
    useGetAllPaperdetailsQuery
} = paperApiSlice;
