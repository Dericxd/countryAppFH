import { Component, inject, resource, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop'

import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country-service';

@Component({
  selector: 'by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  CountryService = inject(CountryService);
  query = signal('');

  //? Usando rxResource
  /* countryResource = rxResource ({
    params: () => ({ query: this.query()}),
    request: ({params}) => {
      // if (!this.query().trim()) return [];

      return this.CountryService.searchByCountry(params.query)
    }
  }) */

  //? Usando resource
  countryResourse = resource({
    params: () => ({ query: this.query() }),
    loader: async({params}) => {
      if (!this.query()) return [];

      return await firstValueFrom(
        this.CountryService.searchByCountry(params.query)
      );
    }
  })
}
