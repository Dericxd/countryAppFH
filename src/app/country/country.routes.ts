import { Routes } from '@angular/router';
import { ByCapitalPage } from './pages/by-capital-page/by-capital-page';
import { CountryLayout } from '../layouts/country-layout/country-layout';
import { ByCountryPage } from './pages/by-country-page/by-country-page';
import { ByRegionPage } from './pages/by-region-page/by-region-page';
import { CountryPage } from './pages/country-page/country-page';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayout,
    children: [
      //? byCapital
      {
        path: 'by-capital',
        component: ByCapitalPage
      },
      //? byCountry
      {
        path: 'by-country',
        component: ByCountryPage
      },
      //? byRegion
      {
        path: 'by-region',
        component: ByRegionPage
      },
      //? ruta dinámica para country
      {
        path: 'by/:code',
        component: CountryPage
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      }
    ]
  },
  // {
  //   path: 'country',
  //   // ??? {}
  // },
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
];

export default countryRoutes;
