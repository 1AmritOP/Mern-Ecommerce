import { NextFunction, Request, Response } from "express";

export interface newUserReqBody{
    name: string, 
    email: string,
    photo: string,
    dob:Date,
    gender: string,
    _id: string
}

export interface newProductReqBody{
    name: string,
    price: number,
    category: string,
    stock: number,
    // photo: string,
    // _id: string
}

export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<any, Record<string, any>>>;


  export type searchRequestQuery={
    search?: string,
    price?:string,
    category?: string,
    sort?:string,
    page?:string
}

export interface baseQuery{
    name?: {
        $regex: string;
        $options: string;
    },
    price?: {
        $lte: number;
    },
    category?: {
        $regex: string;
        $options: string;
    }
}

export type invalidateCacheProps={
    product?:boolean,
    order?:boolean,
    admin?:boolean,
    userId?:string,
    productId?:string
}

export type orderItemType={
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: string;
}

export type shippingInfoType={
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
}

export interface newOrderReqBody{
    shippingInfo: shippingInfoType,
    user: string,
    subtotal: number,
    tax: number,
    discount: number,
    shippingCharges: number,
    total: number,
    orderItems: orderItemType[],
}