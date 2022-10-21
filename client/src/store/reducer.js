import {createSlice} from '@reduxjs/toolkit';

const intialState={
    categoris:[],
    transaction:[]
}

export const expenseSlice=createSlice({
name:'expense',
intialState,
reducers:{
    getTransactions:(state)=>{
    // get code 

    }
}

})

export const{getTransactions}=expenseSlice.actions;
export default expenseSlice.reducer;