export interface PerfilProductor {
  _id: string;
  nombre: string;
  origen: string;
  ruc: string;
  razonSocial: string;
  direccion: string;
  correo: string;
  numeroTelefonico: string;
  tipoProductor: TipoProductor;
  idUsuario: IdUsuario;
  imgPortada?: string;
  descripcion: string;
  equipo?: equipo[];
  premios: Premios[];
  certificaciones: Certificaciones[];
  relaciones?: string[];
  lotes: Lotes[]
}


export type Lotes = {
  _model: 'lotes',
  _id: string
}

export type Certificaciones = {
  nombre: string;
  categoria: string;
  img: string;
}

export type Premios = {
  nombre: string;
  categoria: string;
  img: string;
}

export type equipo = {
  nombre: string;
  rol: string;
  redes: string[];
  img: string;
}

export type IdUsuario = {
  email: string;
  _id: string;
}

export type TipoProductor = 'individual' | 'Asociación' | 'cooperativa'