import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // ==========================================
  // HU-06: Contactos de servicios
  // ==========================================
  getContactos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/contactos`);
  }

  // ==========================================
  // HU-01 y HU-10: Huéspedes
  // ==========================================
  registrarHuesped(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/huespedes`, datos);
  }

  getHuespedPorDocumento(documento: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/huespedes/${documento}`);
  }

  // ==========================================
  // HU-05: Habitaciones
  // ==========================================
  getTiposHabitacion(): Observable<any> {
    return this.http.get(`${this.baseUrl}/habitaciones/tipos`);
  }

  procesarSeleccionHabitacion(tipo: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/habitaciones/seleccionar`, { tipo });
  }

  // ==========================================
  // HU-02, HU-03 y HU-04: Reservas
  // ==========================================
  crearReserva(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservas`, datos);
  }

  getReservasActivas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reservas`);
  }

  registrarCheckIn(idReserva: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/reservas/${idReserva}/checkin`, {});
  }
}