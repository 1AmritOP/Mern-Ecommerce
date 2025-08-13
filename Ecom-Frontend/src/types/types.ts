export type User={
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
}

export type Product ={
    _id: string;
    name: string;
    photo: string;
    category: string;
    price: number;
    stock: number;
}

export type CartItem={
    productId: string;
    name: string;
    price: number;
    quantity: number;
    photo: string;
    stock: number;
}

export type shippingInfoType ={
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
}