import { Country } from "../interfaces/country-interfaces";
import { RESTCountry } from "../interfaces/rest-countries-interfaces";

export class CountryMapper {

  static mapRestCountryToCountry( restCountry: RESTCountry ): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagPng: restCountry.flags.png,
      name: restCountry.translations['spa']?.common || restCountry.name.common,
      // capital: restCountry.capital. ? restCountry.capital[0] : 'No Capital',
      capital: restCountry.capital ? restCountry.capital[0] : 'No Capital',
      population: restCountry.population,
    }
  }

  static mapRestCountryArrayToCountryArray (restCountries: RESTCountry[]): Country[] {
    // return restCountries.map( (country) => this.mapRestCountryToCountry(country) );
    //? forma corta de la misma funcion pero por referencia
    return restCountries.map( this.mapRestCountryToCountry );
  }

}
