import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  //private api = 'http://localhost:3000/api/appointments';
  private api = '/api/appointments';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(this.api, data);
  }
  list(key: string) {
    return this.http.get<any[]>(this.api, { headers: { 'x-admin-key': key } });
  }
  setStatus(id: number, status: string, key: string) {
    return this.http.patch(`${this.api}/${id}`, { status }, { headers: { 'x-admin-key': key } });
  }
}