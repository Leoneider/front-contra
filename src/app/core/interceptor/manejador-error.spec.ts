import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HTTP_ERRORES_CODIGO } from './http-codigo-error';
import { ManejadorError } from './manejador-error';

describe(`AuthHttpInterceptor`, () => {
    let manejadorError: ManejadorError;

    beforeEach( async() => {
        await TestBed.configureTestingModule({
            providers: [ManejadorError]
        }).compileComponents();
      
    });

    beforeEach(() => {
        manejadorError = TestBed.inject(ManejadorError);
    });

    it('handleError llamar a mensaje por defecto y imprimir por consola', () => {
        const spyMensajePorDefecto = spyOn(manejadorError, 'mensajePorDefecto').and.callThrough();
        const spyImprimirErrorConsola = spyOn(manejadorError, 'imprimirErrorConsola').and.callThrough();
        manejadorError.handleError(null);
        expect(spyMensajePorDefecto).toHaveBeenCalled();
        expect(spyImprimirErrorConsola).toHaveBeenCalled();
    });

    it('Retorna error si no es una instancia de HttpErrorResponseFound', () => {
        const error = HTTP_ERRORES_CODIGO.PETICION_FALLIDA;
        const response = (manejadorError).mensajePorDefecto(error);
        expect(response).toEqual(HTTP_ERRORES_CODIGO.PETICION_FALLIDA);
    });

    it('Se muestra mensaje de no conexion', () => {
        spyOnProperty(Navigator.prototype, 'onLine').and.returnValue(false);
        const error = new HttpErrorResponse({});
        const response = (manejadorError).mensajePorDefecto(error);
        expect(response).toEqual(HTTP_ERRORES_CODIGO.NO_HAY_INTERNET);
        
    });

    it('Obtiene descripcion del error cuando se envia code', () => {
        const spyObtenerErrorHttpCode = spyOn(manejadorError, 'obtenerErrorHttpCode').and.callThrough();
        const error = new HttpErrorResponse({
            status: 450,
            error: {}
        });
        (manejadorError).mensajePorDefecto(error);
        expect(spyObtenerErrorHttpCode).toHaveBeenCalled();
    });
});