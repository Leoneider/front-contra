import { by, element } from 'protractor';

export class ConfirmarPage {
  private inputDocumento = element(by.id('documento'));
  private inputPassword = element(by.id('password'));
  botonConfirmar = element(by.id('btn_confirmar'));
    

  // async clickSeleccionarEscenario() {
  //     await this.seleccionarEscenario.click();
  // }

  // async ingresarId(idProducto) {
  //     await this.inputIdProducto.sendKeys(idProducto);
  // }

  async ingresarDocumento(numeroDocumento: string) {
    await this.inputDocumento.sendKeys(numeroDocumento);
  }

  async ingresarPassword(password: string) {
    await this.inputPassword.sendKeys(password);
  }

  async clickBotonConfirmar() {
    await this.botonConfirmar.click();
  }

  // async contarProductos() {
  //     return this.listaProductos.count();
  // }
}
