export interface Reserva {
  id?: number;
  fecha: string;
  hora: number;
  estado: string;
  valor: number;
  escenarioId: number;
  usuarioId: number;
}
