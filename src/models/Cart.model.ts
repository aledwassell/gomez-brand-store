export interface CartCreateResponse {
    data: {
        cartCreate: {
            userErrors: {
                message?: string;
                code?: string;
                field?: string[];
            }[];
            cart: Cart;
        };
    };
    extensions: {
        context: {
            country: string;
            language: string;
        };
        cost: {
            requestedQueryCost: number;
        };
    };
}

export interface Cart {
    id: string;
    checkoutUrl: string;
    attributes: { key: string; value: string }[];
    lines: {
        nodes: Array<BaseCartLine>;
    };
}

export interface BaseCartLine {
    id: string;
    quantity: number;
    cost: {
        totalAmount: {
            amount: string;
            currencyCode: string;
        };
    };
    merchandise: Merchandise;
}

export interface Merchandise {
    id: string;
    title: string;
    price: {
        amount: string;
        currencyCode: string;
    };
    product?: {
        title: string;
        handle: string;
    };
}

export interface CartLineInput {
    merchandiseId: string;
    quantity: number;
}

export interface CartLineUpdateInput {
    id: string;
    quantity: number;
}

export interface CartInput {
    lines: CartLineInput[];
}
