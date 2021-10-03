import { browser, logging } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ProductoPage } from '../page/producto/producto.po';

describe('workspace-project Producto', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let producto: ProductoPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        producto = new ProductoPage();
    });

    it('Deberia crear producto', () => {
        const ID_PRODUCTO = '001';
        const DESCRIPCION_PRODUCTO = 'Producto de pruebas';

        page.navigateTo();
        navBar.clickBotonProductos();
        producto.clickBotonCrearProductos();
        producto.ingresarId(ID_PRODUCTO);
        producto.ingresarDescripcion(DESCRIPCION_PRODUCTO);

        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
    });

    it('Deberia listar productos', () => {
        page.navigateTo();
        navBar.clickBotonProductos();
        producto.clickBotonListarProductos();

        expect(4).toBe(producto.contarProductos());
    });
});
