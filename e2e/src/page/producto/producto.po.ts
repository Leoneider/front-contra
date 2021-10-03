import { by, element } from 'protractor';

export class ProductoPage {
    private linkCrearProducto = element(by.id('linkCrearProducto'));
    private linkListarProductos = element(by.id('linkListarProducto'));
    private inputIdProducto = element(by.id('idProducto'));
    private inputDescripcionProducto = element(by.id('descripcionProducto'));
    private listaProductos = element.all(by.css('ul.productos li'));

    async clickBotonCrearProductos() {
        await this.linkCrearProducto.click();
    }

    async clickBotonListarProductos() {
        await this.linkListarProductos.click();
    }

    async ingresarId(idProducto) {
        await this.inputIdProducto.sendKeys(idProducto);
    }

    async ingresarDescripcion(descripcionProducto) {
        await this.inputDescripcionProducto.sendKeys(descripcionProducto);
    }

    async contarProductos() {
        return this.listaProductos.count();
    }
}
