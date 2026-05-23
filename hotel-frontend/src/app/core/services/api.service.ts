import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

// 6
  getContactos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/contactos`);
  }

// 1 - 10
  registrarHuesped(datos: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/huespedes`, datos);
  }

  getHuespedPorDocumento(documento: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/huespedes/${documento}`);
  }

// 5
  getTiposHabitacion(): Observable<any> {
    return this.http.get(`${this.baseUrl}/habitaciones/tipos`);
  }

  procesarSeleccionHabitacion(tipo: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/habitaciones/seleccionar`, { tipo });
  }

// 2-3-4
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
