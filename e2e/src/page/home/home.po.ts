import { by, element } from 'protractor';

export class HomePage {
    private seleccionarEscenario = element(by.id('1'));
    botonApartarEscenario = element(by.id('btn_select'));
    

    async clickSeleccionarEscenario() {
        await this.seleccionarEscenario.click();
    }

    async clickBotonApartarEscenario() {
        await this.botonApartarEscenario.click();
    }

    // async ingresarId(idProducto) {
    //     await this.inputIdProducto.sendKeys(idProducto);
    // }

    // async ingresarDescripcion(descripcionProducto) {
    //     await this.inputDescripcionProducto.sendKeys(descripcionProducto);
    // }

    // async contarProductos() {
    //     return this.listaProductos.count();
    // }
}
