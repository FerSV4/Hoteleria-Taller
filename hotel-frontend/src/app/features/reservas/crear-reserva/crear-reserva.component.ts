import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-crear-reserva',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-reserva.component.html',
  styleUrl: './crear-reserva.component.css'
})
export class CrearReservaComponent implements OnInit {
  formulario: FormGroup;
  tiposDisponibles: any[] = [];
  caracteristicasHabitacion: any = null;
  
  msjExito: string = '';
  msjError: string = '';
  carga: boolean = false;

  constructor(private apiService: ApiService) {
    this.formulario = new FormGroup({
      documento_huesped: new FormControl('', [Validators.required]),
      tipo_habitacion: new FormControl('', [Validators.required]),
      fecha_ingreso: new FormControl('', [Validators.required]),
      fecha_salida: new FormControl('', [Validators.required]),
      cantidad_personas: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit(): void {
    this.apiService.getTiposHabitacion().subscribe({
      next: (res) => this.tiposDisponibles = res.data,
      error: (err) => console.error('Error de carga', err)
    });
  }

  onTipoChange(event: any): void {
    const tipoSeleccionado = event.target.value;
    if (!tipoSeleccionado) {
      this.caracteristicasHabitacion = null;
      return;
    }

    this.apiService.procesarSeleccionHabitacion(tipoSeleccionado).subscribe({
      next: (res) => {
        this.caracteristicasHabitacion = res.data; 
        this.msjError = ''; 
      },
      error: (err) => {
        this.caracteristicasHabitacion = null;
        this.msjError = err.error?.mensaje || 'Error con el tipo de hab.';
      }
    });
  }

  registrarReserva(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.carga = true;
    this.msjExito = '';
    this.msjError = '';

    const documento = this.formulario.value.documento_huesped;

    this.apiService.getHuespedPorDocumento(documento).subscribe({
      next: (resHuesped) => {
        
        const datosReserva = {
          huesped_id: resHuesped.data.id, 
          habitacion_id: this.caracteristicasHabitacion.id, 
          fecha_ingreso: this.formulario.value.fecha_ingreso,
          fecha_salida: this.formulario.value.fecha_salida,
          cantidad_personas: Number(this.formulario.value.cantidad_personas)
        };

        this.apiService.crearReserva(datosReserva).subscribe({
          next: (res) => {
            this.msjExito = 'Reserva confirmada';
            this.formulario.reset();
            this.caracteristicasHabitacion = null;
            this.carga = false;
          },
          error: (err) => {
            this.msjError = err.error?.mensaje || 'Error al reservar';
            this.carga = false;
          }
        });

      },
      error: (err) => {
        if (err.status === 404) {
          this.msjError = 'Huésped no encontrado, registrarlo.';
        } else {
          this.msjError = 'Error, no se verifico el huesped';
        }
        this.carga = false;
      }
    });
  }
}