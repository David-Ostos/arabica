export interface User {
  nombre: string;
  password?: string;
  email: string;
  _id: string;
  tipoUser: 'productor'| 'comprador'
}