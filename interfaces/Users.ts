export interface User {
  _id?: string;
  nombre: string;
  apellido: string;
  password?: string;
  email: string;
  picture: string
  tipoUser?: 'productor'| 'comprador'
  tipoLogin?: 'google' | 'backend'
}