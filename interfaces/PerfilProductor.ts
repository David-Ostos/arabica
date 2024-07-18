export interface PerfilProductor {
  nombre: string,
  origen: string,
  ruc: string,
  razonSocial: string,
  direccion: string,
  correo: string,
  numeroTelefonico: string,
  tipoProductor: 'individual' | 'Asociación' | 'cooperativa'
  idUsuario: {
    email: string,
    _id: string,
  },
  imgPortada?: string,
  descripcion: string,
  equipo?: [{
    nombre: string
    rol: string,
    redes: string[],
    img: string
  }],
  premios: [{
    nombre: string,
    categoria: string,
    img: string
  }],
  certificaciones: [{
    nombre: string,
    categoria: string,
    img: string
  }],
  relaciones?: string[]
}
