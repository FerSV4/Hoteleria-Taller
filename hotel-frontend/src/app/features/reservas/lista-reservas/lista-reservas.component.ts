import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [DatePipe, RouterLink], 

  templateUrl: './lista-reservas.component.html',
  styleUrl: './lista-reservas.component.css'
})
export class ListaReservasComponent implements OnInit {
  reservas: any[] = [];
  carga: boolean = true;
  msjVacio: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.apiService.getReservasActivas().subscribe({
      next: (res) => {
        this.reservas = res.data;
        if (this.reservas.length === 0) {
          this.msjVacio = res.mensaje;
        }
        this.carga = false;
      },
      error: (err) => {
        console.error('Error carga reservas', err);
        this.carga = false;
      }
    });
  }

  //Check In
  ejecutarCheckIn(id: number): void {
    if (!confirm('¿Confirmar el Check in del huesped?')) return;

    this.apiService.registrarCheckIn(id).subscribe({
      next: () => {
        this.cargarReservas();
      },
      error: (err) => {
        alert(err.error?.mensaje || 'No se pudo realizar el check-in.(error)');
      }
    });
  }
}