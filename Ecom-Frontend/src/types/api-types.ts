import { Product, User } from "./types";


export type CustomError = {
    status: number;
    data: {
      message: string;
      success: boolean;
    };
  };
export type MessageResponse = {
    message: string;
    success: boolean;
};

export type UserResponse={
    success: boolean;
    user: User;
}

export type AllProductsResponse ={
    success: boolean;
    products: Product[];
}