export interface FiltersSearch {
  samplesAvailable: boolean | undefined;
  origin: [string] | [] | undefined;
  points: [number, number] | undefined;
  price: [number, number] | undefined;
  process: string[] | undefined;
  certifications: string[] | undefined;
}
