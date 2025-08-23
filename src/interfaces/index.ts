export interface IProductResponse {
  data: IProduct[];
}

export interface ICategory {
  id?: number;
  documentId?: string;
  title: string;
  products?: IProduct[];
}

export interface IImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface IThumbnail {
  formats?: {
    thumbnail?: IImageFormat;
    small?: IImageFormat;
  };
  url: string;
  width?: number;
  height?: number;
}

export interface IProduct {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  stock?: number;
  thumbnail?: IThumbnail | null;
  category?: ICategory | null;
  quantity?: number;
}
