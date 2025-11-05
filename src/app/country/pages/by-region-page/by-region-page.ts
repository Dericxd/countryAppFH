import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";

@Component({
  selector: 'by-region-page',
  imports: [SearchInput],
  templateUrl: './by-region-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPage { }
