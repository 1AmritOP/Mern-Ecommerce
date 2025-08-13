import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducer-types";
import { CartItem } from "../../types/types";

const initialState: cartReducerInitialState={
    loding: false,
    cartItems: [],
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo:{
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
    }
}

export const cartReducer=createSlice({
    name:"cartReducer",
    initialState,
    reducers:{
        addToCart :(state,action: PayloadAction<CartItem>) => {
            state.loding=true;
            state.cartItems.push(action.payload);
            state.loding=false
        },
        removeCartItem :(state,action: PayloadAction<string>) => {
            state.loding=true;
            state.cartItems=state.cartItems.filter((item) => item.productId !== action.payload);
            state.loding=false
        },
    }
})

export const {addToCart,removeCartItem}=cartReducer.actions