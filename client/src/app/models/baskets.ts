export interface BasketItem {
    productId: number;
    nameOfProduct: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
    quantity: number;
}

export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
    paymentIntentId?: string;
    clientSecret?: string;
}