import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { RESTCountry } from '../interfaces/rest-countries-interfaces';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country-interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region-interfaces';

//? se puede colocar en las variables de entorno
const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>(); // Cache para capitales vacios
  private queryCacheCountry = new Map<string, Country[]>(); // Cache para paises vacios
  private queryCacheRegion = new Map<Region, Country[]>(); // Cache para regiones vacios

  //? Buscar paises por capital
  searchByCapital (query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log(`llegando al servidor por ${ query }`);

    return this.http.get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        delay(2500),
        catchError((error) => {
          console.log(error);
          return throwError(
            () => new Error(`No se encontro un pais con la capital de nombre: ${query}`)
          );
        })
      );
  }

  //? Buscar paises por nombre
  searchByCountry( query: string ): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    console.info(`llegando al servidor por ${ query }`);

    return this.http.get<RESTCountry[]>(`${ API_URL }/name/${ query }`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheCountry.set(query, countries)),
        delay(2500),
        catchError((error) => {
          console.log(error);
          return throwError(
            () => new Error(`No se encontro un pais con el nombre: ${query}`)
          );
        })
      )
  }

  //? Buscar pais por codigo alpha
  searchCountryByAlphaCode( code: string ): Observable<Country | undefined> {
    const url = `${ API_URL }/alpha/${ code }`;

    return this.http.get<RESTCountry[]>(url).pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        // map((countries) => countries.at(0)),
        map((countries) => countries[0]),
        catchError((error) => {
          console.log(error);
          return throwError(
            () => new Error(`No se encontro un pais con ese codigo: ${code}`)
          );
        })
      )
  }

  //? Buscar paises por region
  searchByRegion( region: Region ): Observable<Country[]> {
    const url = `${ API_URL }/region/${ region }`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheRegion.set(region, countries)),
        delay(2500),
        catchError((error) => {
          console.log(error);
          return throwError(
            () => new Error(`No se encontro ningun pais en la region: ${region}`)
          );
        })
      )
  }

}
