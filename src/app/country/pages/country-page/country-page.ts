import { Component, inject, resource } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country-service';
import { firstValueFrom } from 'rxjs';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { CountryInformation } from "../by-country-page/country-information/country-information";

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  //? RxJS Resource version
  countryResource = rxResource ({
    params: () => ({ code: this.countryCode}),
    stream: ({params}) => {
      if (!params.code) throw new Error ('Country code is required');
      return this.countryService.searchCountryByAlphaCode(params.code)
    }
  })

  //? Resource version with loader
  // countryResource = resource({
  //   params: () => ({ code: this.countryCode }),
  //   loader: async ({ params }) => {

  //     return await firstValueFrom(
  //       this.countryService.searchCountryByAlphaCode(params.code)
  //     );
  //   }
  // });

}
