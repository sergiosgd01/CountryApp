import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountryService {

  private apiUrl = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountry: {
      term: '',
      countries: []
    },
    byRegion: {
      region: undefined,
      countries: []
    }
  };

  constructor(private httpClient: HttpClient) {
    this.getFromLocalStorage();
  }

  private saveTolocalStorage() {
    localStorage.setItem ('cacheStore', JSON.stringify(this.cacheStore));
  }

  private getFromLocalStorage() {
    const cacheStore = localStorage.getItem('cacheStore');
    if (cacheStore) {
      this.cacheStore = JSON.parse(cacheStore);
    }
  }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError( () => of([]) )
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null) )
     );
  }

  searchByCapital( capital: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term: capital, countries: countries }),
        tap( () => this.saveTolocalStorage() )
      );
  }

  searchByCountryName( name: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${name}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountry = { term: name, countries: countries }),
        tap( () => this.saveTolocalStorage() )
      );
  }

  searchByRegion( region: Region ): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region: region, countries: countries }),
        tap( () => this.saveTolocalStorage() )
      );
  }

}
