import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../services-data';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  services = SERVICES;
}