import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-page',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './home-page.html',
})
export class HomePage { }
