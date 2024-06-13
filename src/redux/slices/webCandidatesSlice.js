import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getWebJobs = createAsyncThunk(
    'webcandidate/webCandidates',
    async () => {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };

        const request = await axios.get('https://hireflowapi.focusrtech.com:90/hiring/entryLevel/postJob', config);
        const response = request.data;
        return response;
    }
);

export const postJobs = createAsyncThunk(
    'webcandidate/postJob',
    async (jobDetails) => {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        const request = await axios.post('https://hireflowapi.focusrtech.com:90/hiring/entryLevel/postJob', jobDetails, config);
        const response = request.data;

        return response;
    }
)






const initialState = {
    isLoading: false,
    jobDetails: [],

    error: "",
};

const webCandidatesSlice = createSlice(
    {
        name: "webcandidate",
        initialState,
        extraReducers: (builder) => {
            builder
                .addCase(getWebJobs.pending, (state) => {
                    state.isLoading = true;
                    state.jobDetails = [];
                    state.error = ""
                }
                )
                .addCase(getWebJobs.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.jobDetails = action.payload
                    state.error = ""
                }
                )
                .addCase(getWebJobs.rejected, (state) => {
                    state.isLoading = false
                    state.jobDetails = []
                    state.error = "unable to fetch details"
                }
                )
                
        }
    }
)

export default webCandidatesSlice.reducer;
export const getJobDetails = (state) => state.webcandidate.jobDetails;
