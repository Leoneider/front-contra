import { by, element } from 'protractor';

export class ReservaPage {
    private seleccionarHora = element(by.id('20'));
    botonConfirmarHora = element(by.id('btn_confirmar_hora'));
    
    async clickSeleccionarHora() {
        await this.seleccionarHora.click();
    }

    async clickBotonConfirmarHora() {
        await this.botonConfirmarHora.click();
    }
}
