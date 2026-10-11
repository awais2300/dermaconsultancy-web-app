import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../services-data';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services = SERVICES;
}