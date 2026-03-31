import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-registro-huesped',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-huesped.component.html',
  styleUrl: './registro-huesped.component.css'
})
export class RegistroHuespedComponent {
  formulario: FormGroup;
  msjExito: string = '';
  msjError: string = '';
  cargando: boolean = false;

  constructor(private apiService: ApiService) {
    this.formulario = new FormGroup({
      documento: new FormControl('', [Validators.required]),
      nombre_completo: new FormControl('', [Validators.required]),
      telefono: new FormControl(''),
      correo: new FormControl('', [Validators.email])
    });
  }

  registrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.msjExito = '';
    this.msjError = '';

    this.apiService.registrarHuesped(this.formulario.value).subscribe({
      next: (respuesta) => {
        this.msjExito = 'Huesped registrado. OK';
        this.formulario.reset();
        this.cargando = false;
      },
      error: (err) => {
        if (err.status === 409) {
          this.msjError = 'Este documento de identidad ya esta registrado.';
        } else {
          this.msjError = 'Ocurrió un error';
        }
        this.cargando = false;
      }
    });
  }
}