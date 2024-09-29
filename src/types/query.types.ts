export type TQuery = {
  minPrice?: number | null;
  maxPrice?: number | null;
  releaseDate?: string;
  brand?: string;
  modelNumber?: string;
  category?: string;
  operatingSystem?: string[] | null;
  connectivity?: string[] | null;
  powerSource?: string[] | null;
  cameraResolution?: number | null;
  storage?: number | null;
};
