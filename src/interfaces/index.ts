export interface IProductResponse {
  data: IProduct[];
}

export interface ICategory {
  id?: number;
  documentId?: string;
  title: string;
  products?: IProduct[];
}
export interface IProduct {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  stock?: number;
  thumbnail: {
    url: string;
    width?: number;
    height?: number;
  };
  category: ICategory;
  quantity?: number;
}
