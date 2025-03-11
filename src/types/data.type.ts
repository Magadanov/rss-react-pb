export interface CountryData {
  name: {
    common: string;
    official: string;
  };
  region: string;
  area: number;
  flag: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
}

export type SortingOrderType = 'default' | 'asc' | 'desc';
