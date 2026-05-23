import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let mockHttpClient: any;

  beforeEach(() => {
    mockHttpClient = {
      get: jasmine.createSpy('get').and.returnValue(of([])),
      post: jasmine.createSpy('post').and.returnValue(of({})),
      patch: jasmine.createSpy('patch').and.returnValue(of({}))
    };

    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpClient, useValue: mockHttpClient }
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('debería crearse correctamente (instancia)', () => {
    expect(service).toBeTruthy();
  });

  it('debería enviar la petición POST para crear la reserva', () => {
    const datosReserva = { huesped_id: 1, habitacion_id: 1, cantidad_personas: 2 };
    
    service.crearReserva(datosReserva);

    expect(mockHttpClient.post).toHaveBeenCalledWith('http://localhost:8080/api/reservas', datosReserva);
  });
});