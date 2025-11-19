import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { RegionButton } from "../../components/region-button/region-button";
import { Region } from '../../interfaces/region-interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country-service';
import { CountryList } from "../../components/country-list/country-list";
import { ActivatedRoute, Router } from '@angular/router';

//? para validar el query de region
function validateQueryParam(queryParam: string) {

  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa:'Africa',
    americas:'Americas',
    asia:'Asia',
    europe:'Europe',
    oceania:'Oceania',
    antarctic:'Antarctic'
  }

  return validRegions[queryParam as keyof typeof validRegions] || 'Americas';
}

@Component({
  selector: 'by-region-page',
  imports: [RegionButton, CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {

  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic'
  ];

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  // query = linkedSignal(() => this.queryParam);
  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));


  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  countryResource = rxResource({
    params: () => ({region: this.selectedRegion() }),
    stream: ({ params }) => {
      console.log({region: params.region});
      if (!params.region)  return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region,
        }
      });

      return this.countryService.searchByRegion(params.region);
    },
  })
}
