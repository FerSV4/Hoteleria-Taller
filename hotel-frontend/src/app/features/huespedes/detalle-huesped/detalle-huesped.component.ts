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
  
  huespedEncontrado: any = null;
  mensajeError: string = '';
  cargando: boolean = false;

  constructor(private apiService: ApiService) {}

  buscar(): void {
    if (this.buscadorControl.invalid) {
      this.buscadorControl.markAsTouched();
      return;
    }

    this.cargando = true;
    this.huespedEncontrado = null;
    this.mensajeError = '';

    const documento = this.buscadorControl.value as string;

    this.apiService.getHuespedPorDocumento(documento).subscribe({
      next: (res) => {
        this.huespedEncontrado = res.data;
        this.cargando = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.mensajeError = err.error?.mensaje || 'No hay huespedes con ese carnet.';
        } else {
          this.mensajeError = 'Error con la DB.';
        }
        this.cargando = false;
      }
    });
  }
}