import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { expenseSlice } from './reducer';
import {apiSlice} from './apiSlice';
import { getDatasetAtEvent } from 'react-chartjs-2';



export const store=configureStore({
    reducer:{
    expense:expenseSlice,
    [apiSlice.reducerPath]:apiSlice.reducer,
    }
    ,
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(apiSlice.middleware)
})