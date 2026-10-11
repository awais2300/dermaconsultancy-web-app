import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  key = '';
  items: any[] = [];
  error = '';

  constructor(private svc: AppointmentService) {}

  load() {
    this.error = '';
    this.svc.list(this.key).subscribe({
      next: (data) => (this.items = data),
      error: () => (this.error = 'Wrong key or server not running.'),
    });
  }

  setStatus(id: number, status: string) {
    this.svc.setStatus(id, status, this.key).subscribe(() => this.load());
  }
}