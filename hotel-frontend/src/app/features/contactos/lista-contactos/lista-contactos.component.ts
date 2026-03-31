import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-lista-contactos',
  standalone: true,
  imports: [],
  templateUrl: './lista-contactos.component.html',
  styleUrl: './lista-contactos.component.css'
})
export class ListaContactosComponent implements OnInit {
  contactos: any[] = [];
  mensajeVacio: string = '';
  cargando: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarContactos();
  }

  cargarContactos(): void {
    this.apiService.getContactos().subscribe({
      next: (respuesta) => {
        this.contactos = respuesta.data;
        if (this.contactos.length === 0) {
          this.mensajeVacio = respuesta.mensaje; 
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar:', err);
        this.mensajeVacio = 'Error de carga.';
        this.cargando = false;
      }
    });
  }
}