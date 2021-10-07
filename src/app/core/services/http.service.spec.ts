import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';

describe('Http Service', () => {
    let httpService: HttpService;
    let httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                HttpService
            ]
        });
        httpService = TestBed.inject(HttpService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(httpService).toBeTruthy();
    });

    it('Cuando se llame optName ejecuta setHeader con parametros xhr-name y name', () => {
        const name = 'Permite agregar options name';
        const spySetHeader = spyOn(httpService, 'setHeader').and.callThrough();
        httpService.optsName(name);
        expect(spySetHeader).toHaveBeenCalledWith('xhr-name', name);
    });

    it('should create options', () => {
        const spyCreateDefaultOptions = spyOn(httpService, 'createDefaultOptions').and.callThrough();
        (httpService).createOptions({});
        expect(spyCreateDefaultOptions).toHaveBeenCalled();
    });

    it('should create options with not opts.headers', () => {
        const spyCreateDefaultOptions = spyOn(httpService, 'createDefaultOptions').and.callThrough().and.returnValue({
            headers: new HttpHeaders({ 'Content-Type': '' })
        });
        (httpService).createOptions({});
        expect(spyCreateDefaultOptions).toHaveBeenCalled();
    });

    it('Realiza peticion doPost', () => {
        const options = {};
        const url = '/prueba';
        const body = { prueba: 'prueba' };
        const spyDoPost = spyOn(httpService, 'createOptions').and.callThrough();
        httpService.doPost(url, body, options).toPromise();
        expect(spyDoPost).toHaveBeenCalled();
        const httpRequest = httpTestingController.expectOne(url);
        expect(httpRequest.request.method).toEqual('POST');
        expect(httpRequest.request.url).toEqual(url);
        expect(httpRequest.request.body).toEqual(body);
    });

    it('Realiza peticion doDelete', () => {
        const options = {};
        const url = '/prueba';
        const spyDoPost = spyOn(httpService, 'createOptions').and.callThrough();
        httpService.doDelete(url, options).toPromise();
        expect(spyDoPost).toHaveBeenCalled();
        const httpRequest = httpTestingController.expectOne(url);
        expect(httpRequest.request.method).toEqual('DELETE');
        expect(httpRequest.request.url).toEqual(url);
    });

    it('Se permite obtener los aprametrosde la url', () => {
        const options = {};
        const url = '/prueba';
        const params = new HttpParams({ fromObject: { id: '1', name: 'Jhon' } });
        const spyDoPost = spyOn(httpService, 'createOptions').and.callThrough();
        httpService.doGetParameters(url, params, options).toPromise();
        expect(spyDoPost).toHaveBeenCalled();
        const httpRequest = httpTestingController.expectOne(`${url}?id=1&name=Jhon`);
        expect(httpRequest.request.method).toEqual('GET');
        expect(httpRequest.request.url).toEqual(`${url}`);
        expect(httpRequest.request.params).toEqual(params);
    });
});