import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { firstValueFrom, of } from 'rxjs';

import { CountryList } from "../../components/country-list/country-list";
import { SearchInput } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country-service';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryList, SearchInput],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  CountryService = inject(CountryService);
  query = signal('');

  //? Usando rxResource
  /* countryResource = rxResource ({
    params: () => ({ query: this.query()}),
    request: ({params}) => {
      if (!this.query().trim()) return of[];

      return this.CountryService.searchByCapital(params.query)
    }
  }) */

  //? Usando resource
  countryResource = resource({
    params: () => ({ query: this.query()}),
    loader: async({params}) => {
      if (!this.query()) return [];

      return await firstValueFrom(
        this.CountryService.searchByCapital(params.query)
      );
    }
  })


  /* isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    //* si isLoading es true, no hacer nada
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.CountryService.searchByCapital(query)
      .subscribe({
        next: (countries) => {
          this.isLoading.set(false);
          this.countries.set(countries);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.isError.set(err.message);
          this.countries.set([]);
        },
      });
  } */
}
