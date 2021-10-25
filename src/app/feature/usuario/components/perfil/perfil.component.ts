import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/feature/reserva/shared/model/reserva';
import { ReservaService } from 'src/app/feature/reserva/shared/services/reserva.service';
import { Usuario } from '../../shared/model/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  reservas: Reserva[] = [];
  userLogado: Usuario = {
    id: 0,
    documento: '',
    nombres: '',
    apellidos: '',
    celular: '',
    email: '',
    fehca_nacimiento: '',
    contrasena: '',
  };
  displayedColumns: string[] = ['id', 'fecha', 'hora', 'estado', 'valor'];

  constructor(private reservaService: ReservaService) {}

  async ngOnInit(){
    this.userLogado = await this.obtenerUsuario();
    this.listadoDeReservas();
  }

  listadoDeReservas() {
    this.reservaService
      .consultarPorIdUsuario(this.userLogado.id)
      .subscribe((res) => {
        this.reservas = res;
      });
  }

  obtenerUsuario(){
    return new Promise<Usuario>((resolve) => {
      resolve(JSON.parse(localStorage.getItem('user')));
    })
  }
}
