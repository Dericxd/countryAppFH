import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop'

import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  //? Usando rxResource
  /* countryResource = rxResource ({
    params: () => ({ query: this.query()}),
    stream: ({params}) => {
      // if (!this.query().trim()) return [];

      return this.CountryService.searchByCountry(params.query)
    }
  }) */

  //? Usando resource
  countryResourse = resource({
    params: () => ({ query: this.query() }),
    loader: async({params}) => {
      if (!this.query().trim()) return [];

      this.router.navigate(['/country/by-country'],{
        queryParams: {
          query: params.query,
        }
      });

      return await firstValueFrom(
        this.countryService.searchByCountry(params.query)
      );
    }
  })
}
