import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { firstValueFrom, of } from 'rxjs';

import { CountryList } from "../../components/country-list/country-list";
import { SearchInput } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-capital-page',
  imports: [CountryList, SearchInput],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  CountryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  //? Usando rxResource
  countryResource = rxResource ({
    params: () => ({ query: this.query()}),
    stream: ({params}) => {
      if (!params.query) return of([]);

      this.router.navigate(['/country/by-capital'],{
        queryParams: {
          query: params.query,
        }
      });

      return this.CountryService.searchByCapital(params.query)
    }
  })

  //? Usando resource
  // countryResource = resource({
  //   params: () => ({ query: this.query()}),
  //   loader: async({params}) => {
  //     if (!this.query()) return [];

  //     return await firstValueFrom(
  //       this.CountryService.searchByCapital(params.query)
  //     );
  //   }
  // })


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
