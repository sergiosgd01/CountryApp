import { Country } from "./country";
import { Region } from "./region.type";

export interface CacheStore {
  byCapital: CacheStoreItem;
  byCountry: CacheStoreItem;
  byRegion: CacheStoreRegion;
}

export interface CacheStoreItem {
  term: string;
  countries: Country[];
}

export interface CacheStoreRegion {
  region?: Region;
  countries: Country[];
}
