import { Country } from "../interfaces/country-interfaces";
import { RESTCountry } from "../interfaces/rest-countries-interfaces";

export class CountryMapper {

  static mapRestCountryToCountry( restCountry: RESTCountry ): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagPng: restCountry.flags.png,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa']?.common || restCountry.name.common,
      // capital: restCountry.capital. ? restCountry.capital[0] : 'No Capital',
      capital: restCountry.capital ? restCountry.capital[0] : 'No Capital',
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
      languages: restCountry.languages ? Object.values(restCountry.languages) : [],
      currencies: restCountry.currencies ? Object.values(restCountry.currencies).map( curr => curr.name ) : [],
      borders: restCountry.borders ? restCountry.borders : [],
      continents: restCountry.continents ? restCountry.continents[0] : '',
      map: restCountry.maps.googleMaps ? restCountry.maps.googleMaps : '',
    }
  }

  static mapRestCountryArrayToCountryArray (restCountries: RESTCountry[]): Country[] {
    // return restCountries.map( (country) => this.mapRestCountryToCountry(country) );
    //? forma corta de la misma funcion pero por referencia
    return restCountries.map( this.mapRestCountryToCountry );
  }

}
