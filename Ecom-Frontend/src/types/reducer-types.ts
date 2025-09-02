import { CartItem, shippingInfoType, User } from "./types";

export interface userReducerInitialState {
    user: User | null;
    loading: boolean;
    // error: string | null;
}

export interface cartReducerInitialState {
    loading: boolean;
    cartItems: CartItem[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    shippingInfo: shippingInfoType;
}