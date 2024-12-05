export interface PerfilComprador {
  _id?: string;
  nombre?: string;
  fechaOrigen?: string;
  origen?: string;
  ruc?: string;
  direccion?: Direccion;
  numeroTelefonico?: NumeroTelefonico;
  idUsuario?: IdUsuario;
  loteslikes?: Loteslikes[];
  redes?: Redes[]
}

export type Redes = {
  tipoRed?: string
  linkbase?: string
  linkUsuario?: string
  icon?:string
}

export type Direccion = {
  direccion1?: string,
  direccion2?: string,
  ciudad?: string,
  codigoPostal?: string,
}

export type NumeroTelefonico = {
  numero?: string,
  code?: string,
  bandera?: string
}

export type Loteslikes = {
  _model?: 'lotes',
  _id?: string
}

export type IdUsuario = {
  email?: string;
  _id?: string;
}