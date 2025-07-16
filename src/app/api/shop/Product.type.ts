export interface ProductType {
  id?: number;
  category: string;
  imgURL: string;
  brand: string;
  price: string;
  title: string;
  explanation: string;
}

export interface CustodyType {
  id: number;
  productId: number;
  inventoryId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    category: string;
    imgURL: string;
    brand: string;
    price: string;
    title: string;
    explanation: string;
    createdAt: string;
    updatedAt: string;
  };
  inventory: {
    id: number;
    productId: number;
    imgURL: string;
    isSold: boolean;
    isUse: boolean;
    expiration: string;
    createdAt: string;
    updatedAt: string;
  };
}
