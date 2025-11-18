import { Component, inject, signal } from '@angular/core';
import { Region } from '../../interfaces/region-interfaces';
import { CountryService } from '../../services/country-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'region-button',
  imports: [],
  templateUrl: './region-button.html',
})
export class RegionButton {

  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic'
  ];

  selectedRegion = signal<Region | null>(null);

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  countryResource = rxResource({
    params: () => ({region: this.selectedRegion() }),
    stream: ({ params }) => {
      console.log("🚀 ~ RegionButton ~ request:", params)
      if (!params.region) return of([]);

      return this.countryService.searchByRegion(params.region);
    }
  })

}
