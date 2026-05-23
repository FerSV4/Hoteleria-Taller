import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
selector: 'app-lista-contactos',
standalone: true,
imports: [],
templateUrl: './lista-contactos.component.html',
styleUrl: './lista-contactos.component.css'
})
export class ListaContactosComponent implements OnInit {
contactos: unknown[] = [];

mensajeVacio = '';
cargando = true;

private apiService = inject(ApiService);

ngOnInit(): void {
this.cargarContactos();
}

cargarContactos(): void {
this.apiService.getContactos().subscribe({
next: (respuesta: unknown) => {
const res = respuesta as { data: unknown[], mensaje: string };
this.contactos = res.data;
if (this.contactos.length === 0) {
this.mensajeVacio = res.mensaje;
}
this.cargando = false;
},
error: (err: unknown) => {
console.error('Error al cargar:', err);
this.mensajeVacio = 'Error de carga.';
this.cargando = false;
}
});
}
}