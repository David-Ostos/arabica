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
  equipo?: Equipo[];
  premios?: Premios[];
  certificaciones?: Certificaciones[];
  relaciones?: string[];
  lotes?: LotesProductor[];
  logo?: string;
  redes?: Redes[];
  imgDestacadas?: ImgDestacadas[];
}

export type ImgDestacadas = {
  _id?: string;
  link?: string;
  position?: number;
}

export type Redes = {
  tipoRed?: string
  linkbase?: string
  linkUsuario?: string
  icon?:string
}

export type Direccion = {
  direccion?: string,
  departamento?: string,
  provincia?: string,
  distrito?: string,
  codigoPostal?: string,
}

export type NumeroTelefonico = {
  numero?: string,
  code?: string,
  bandera?: string
}

export type LotesProductor = {
  _model?: 'lotes',
  _id?: string
}

export type Certificaciones = {
  _id?: string;
  year?: string;
  certificacion?: string;
  picture?: string;
}

export type Premios = {
  _id?: string;
  year?: string;
  nombre?: string;
}

export type Equipo = {
  _id?: string;
  nombre?: string;
  apellido?: string;
  rol?: string;
  picture?: string;
  fileSave?: any
}

export type IdUsuario = {
  email?: string;
  _id?: string;
}

export type TipoProductor = 'individual' | 'Asociación' | 'cooperativa' | '' | undefined