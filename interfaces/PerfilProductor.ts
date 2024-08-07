export interface PerfilProductor {
  _id?: string;
  nombre?: string;
  origen?: string;
  ruc?: string;
  razonSocial?: string;
  direccion?: Direccion;
  correo?: string;
  numeroTelefonico?: NumeroTelefonico;
  tipoProductor?: TipoProductor;
  idUsuario?: IdUsuario;
  imgPortada?: string;
  descripcion?: string;
  equipo?: equipo[];
  premios?: Premios[];
  certificaciones?: Certificaciones[];
  relaciones?: string[];
  lotes?: Lotes[],
  logo?: string;
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

export type Lotes = {
  _model?: 'lotes',
  _id?: string
}

export type Certificaciones = {
  nombre?: string;
  categoria?: string;
  img?: string;
}

export type Premios = {
  nombre?: string;
  categoria?: string;
  img?: string;
}

export type equipo = {
  nombre?: string;
  rol?: string;
  redes?: string[];
  img?: string;
}

export type IdUsuario = {
  email?: string;
  _id?: string;
}

export type TipoProductor = 'individual' | 'Asociación' | 'cooperativa' | '' | undefined