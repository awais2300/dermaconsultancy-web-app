import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-book',
  imports: [FormsModule],
  templateUrl: './book.component.html',
    styleUrl: './book.component.css'
})
export class BookComponent {

  model = {
    name: '',
    email: '',
    phone: '',
    concern: '',
    preferredDate: ''
  };

  submitted = false;
  isSubmitting = false;
  isDragging = false;

  error = '';
  uploadError = '';

  paymentScreenshot: File | null = null;

  // Prevent users from selecting a past appointment date
  minDate = new Date().toISOString().split('T')[0];

  constructor(private svc: AppointmentService) {}

  // Select screenshot from computer
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.setScreenshot(input.files[0]);
    }

    input.value = '';
  }

  // Validate screenshot
  setScreenshot(file: File) {
    this.uploadError = '';

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {
      this.uploadError = 'Please upload a JPG, PNG or WEBP image.';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.uploadError = 'Screenshot must be smaller than 5 MB.';
      return;
    }

    this.paymentScreenshot = file;
  }

  // Remove selected screenshot
  removeScreenshot() {
    this.paymentScreenshot = null;
    this.uploadError = '';
  }

  // Drag and drop methods
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const file = event.dataTransfer?.files[0];

    if (file) {
      this.setScreenshot(file);
    }
  }

  // Submit appointment with payment screenshot
  submit() {
    this.error = '';
    this.uploadError = '';

    if (!this.paymentScreenshot) {
      this.uploadError = 'Please upload your payment screenshot.';
      return;
    }

    const formData = new FormData();

    formData.append('name', this.model.name);
    formData.append('email', this.model.email);
    formData.append('phone', this.model.phone);
    formData.append('concern', this.model.concern);
    formData.append('preferredDate', this.model.preferredDate);

    formData.append(
      'paymentScreenshot',
      this.paymentScreenshot
    );

    this.isSubmitting = true;

    this.svc.create(formData).subscribe({

      next: () => {
        this.submitted = true;
        this.isSubmitting = false;
      },

      error: (err) => {
        console.error('Appointment submission error:', err);

        this.error = 'Fill in the required fields. Please try again.';
        this.isSubmitting = false;
      }

    });
  }
}