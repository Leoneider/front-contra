
import { browser, by, element } from 'protractor';
import { ConfirmarPage } from '../page/confirmar/confirmar.po';
import { HomePage } from '../page/home/home.po';
import { ReservaPage } from '../page/reserva/reserva.po';

describe('Componente HOME', () => {
  let home: HomePage;
  let reserva: ReservaPage;
  let confirmar: ConfirmarPage;

  beforeEach(async () => {
    home = new HomePage();
    reserva = new ReservaPage();
    confirmar = new ConfirmarPage();
    await browser.get(browser.baseUrl);
  });

  it('Boton apartar escenario inicia deshabilitado', async () => {
    expect(element(by.id('btn_select')).isEnabled()).toEqual(false);
  });


  it('Se habilita boton apartar escenario', async () => {
    await home.clickSeleccionarEscenario();
    expect(element(by.id('btn_select')).isEnabled()).toEqual(true);
  });

  it('Redirige a la vista de reservas', async () => {
    await home.clickSeleccionarEscenario();
    await home.clickBotonApartarEscenario();
    expect(await browser.getCurrentUrl()).toContain("reservar");
  });

  it('Habilita boton confirmar hora', async () => {
    await home.clickSeleccionarEscenario();
    await home.clickBotonApartarEscenario();
    await reserva.clickSeleccionarHora();
    expect(element(by.id('btn_confirmar_hora')).isEnabled()).toEqual(true);
  });

  it('Redirige a la opcion confirmar', async () => {
    await home.clickSeleccionarEscenario();
    await home.clickBotonApartarEscenario();
    await reserva.clickSeleccionarHora();
    await reserva.clickBotonConfirmarHora();
    expect(await browser.getCurrentUrl()).toContain("reservar/confirmar");
  });

  it('Se habilita el boton confirmar reserva', async () => {
    await home.clickSeleccionarEscenario();
    await home.clickBotonApartarEscenario();
    await reserva.clickSeleccionarHora();
    await reserva.clickBotonConfirmarHora();
    await confirmar.ingresarDocumento('1091661577');
    expect(element(by.id('btn_confirmar')).isEnabled()).toEqual(true);
  });

  it('Ingresar password incorrecto', async () => {
    await home.clickSeleccionarEscenario();
    await home.clickBotonApartarEscenario();
    await reserva.clickSeleccionarHora();
    await reserva.clickBotonConfirmarHora();
    await confirmar.ingresarDocumento('1091661577');
    await confirmar.ingresarPassword('123456789')
    await confirmar.clickBotonConfirmar();
    expect(await browser.getCurrentUrl()).toContain("reservar/confirmar");
  });

  it('Se crea la reserva correctamente', async () => {
    await home.clickSeleccionarEscenario();
    await home.clickBotonApartarEscenario();
    await reserva.clickSeleccionarHora();
    await reserva.clickBotonConfirmarHora();
    await confirmar.ingresarDocumento('1091661577');
    await confirmar.ingresarPassword('1234567')
    await confirmar.clickBotonConfirmar();
    expect(await browser.getCurrentUrl()).toContain("usuario/perfil");
  });




});
