import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-book',
  imports: [FormsModule],
  templateUrl: './book.component.html',
})
export class BookComponent {
  model = { name: '', email: '', phone: '', concern: '', preferredDate: '' };
  submitted = false;
  error = '';

  constructor(private svc: AppointmentService) {}

  submit() {
    this.error = '';
    this.svc.create(this.model).subscribe({
      next: () => (this.submitted = true),
      error: () => (this.error = 'Could not submit. Please try again.'),
    });
  }
}