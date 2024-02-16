export type TGadget = {
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  modelNumber: string;
  category: string;
  operatingSystem?: string;
  connectivity?: string;
  powerSource?: string;
  features?: {
    cameraResolution?: number;
    storageCapacity?: number;
  };
};
