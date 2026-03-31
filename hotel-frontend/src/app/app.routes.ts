import { Routes } from '@angular/router';
import { RegistroHuespedComponent } from './features/huespedes/registro-huesped/registro-huesped.component';
import { DetalleHuespedComponent } from './features/huespedes/detalle-huesped/detalle-huesped.component';
import { ListaReservasComponent } from './features/reservas/lista-reservas/lista-reservas.component';
import { CrearReservaComponent } from './features/reservas/crear-reserva/crear-reserva.component';
import { ListaContactosComponent } from './features/contactos/lista-contactos/lista-contactos.component';


export const routes: Routes = [
{ path: '', redirectTo: '/reservas', pathMatch: 'full' },
{ path: 'huespedes/nuevo', component: RegistroHuespedComponent },
{ path: 'huespedes/buscar', component: DetalleHuespedComponent },
{ path: 'reservas', component: ListaReservasComponent },
{ path: 'reservas/nueva', component: CrearReservaComponent },
{ path: 'contactos', component: ListaContactosComponent }
];
