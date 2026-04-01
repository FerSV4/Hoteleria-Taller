import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-detalle-huesped',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './detalle-huesped.component.html',
  styleUrl: './detalle-huesped.component.css'
})
export class DetalleHuespedComponent {
  buscadorControl = new FormControl('', [Validators.required]);
  
  huespedUbicado: any = null;
  msjError: string = '';
  cargando: boolean = false;

  constructor(private apiService: ApiService) {}

  buscar(): void {
    if (this.buscadorControl.invalid) {
      this.buscadorControl.markAsTouched();
      return;
    }

    this.cargando = true;
    this.huespedUbicado = null;
    this.msjError = '';

    const documento = this.buscadorControl.value as string;

    this.apiService.getHuespedPorDocumento(documento).subscribe({
      next: (res) => {
        this.huespedUbicado = res.data;
        this.cargando = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.msjError = err.error?.mensaje || 'No hay huespedes con ese carnet.';
        } else {
          this.msjError = 'Error con la DB.';
        }
        this.cargando = false;
      }
    });
  }
}