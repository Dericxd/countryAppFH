import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { RESTCountry } from '../interfaces/rest-countries-interfaces';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country-interfaces';
import { CountryMapper } from '../mappers/country.mapper';

//? se puede colocar en las variables de entorno
const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  //? Buscar paises por capital
  searchByCapital (query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        delay(3000),
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

    return this.http.get<RESTCountry[]>(`${ API_URL }/name/${ query }`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        delay(3000),
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

}
